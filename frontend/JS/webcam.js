document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('webcam-video');
    const overlayElement = document.getElementById('video-overlay');
    const statusText = document.getElementById('camera-status');

    let model = null;
    let classIndices = {};
    let isModelLoaded = false;
    
    // Prediction stability
    let predictionBuffer = [];
    const BUFFER_SIZE = 5; 
    let lastPredictionTime = 0;
    const PREDICTION_INTERVAL = 100;

    // Load TensorFlow Model
    try {
        if (statusText) statusText.textContent = "Loading Model...";
        // Load the model locally using TFJS with cache buster
        model = await tf.loadLayersModel('web_model/model.json?t=' + new Date().getTime());
        
        // Load class indices
        const response = await fetch('web_model/class_indices.json');
        const data = await response.json();
        classIndices = data.index_to_class || data; 
        isModelLoaded = true;
        
        if (statusText) statusText.textContent = "Model Loaded. Starting camera...";
    } catch (e) {
        console.error("Error loading model:", e);
        if (statusText) {
            statusText.textContent = `Error loading ASL model: ${e.message}`;
            statusText.classList.add('error-text');
        }
    }

    // Initialize MediaPipe Hands
    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    });

    hands.onResults((results) => {
        if (!isModelLoaded || !results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
            return;
        }

        const now = Date.now();
        if (now - lastPredictionTime < PREDICTION_INTERVAL) return;
        lastPredictionTime = now;

        const landmarks = results.multiHandLandmarks[0];
        const wrist = landmarks[0];
        
        // Normalize landmarks relative to wrist (landmark 0) and scale by max distance
        const inputData = [];
        let maxDist = 0;
        
        for (let i = 0; i < 21; i++) {
            const dx = landmarks[i].x - wrist.x;
            const dy = landmarks[i].y - wrist.y;
            const dz = landmarks[i].z - wrist.z;
            
            inputData.push(dx, dy, dz);
            
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist > maxDist) {
                maxDist = dist;
            }
        }
        
        maxDist += 1e-6;
        for (let i = 0; i < inputData.length; i++) {
            inputData[i] /= maxDist;
        }

        // Run Inference
        tf.tidy(() => {
            const inputTensor = tf.tensor2d([inputData]); 
            const prediction = model.predict(inputTensor);
            const scores = prediction.dataSync();
            
            const maxScore = Math.max(...scores);
            const maxIndex = scores.indexOf(maxScore);
            const predictedLetter = classIndices[maxIndex.toString()] || classIndices[maxIndex];

            if (predictedLetter) {
                // Buffer to stabilize predictions
                predictionBuffer.push({ letter: predictedLetter, score: maxScore });
                if (predictionBuffer.length > BUFFER_SIZE) {
                    predictionBuffer.shift();
                }

                // Majority voting
                const counts = {};
                let maxCount = 0;
                let stableLetter = predictedLetter;
                let avgScore = maxScore;
                
                predictionBuffer.forEach(p => {
                    counts[p.letter] = (counts[p.letter] || 0) + 1;
                    if (counts[p.letter] > maxCount) {
                        maxCount = counts[p.letter];
                        stableLetter = p.letter;
                    }
                });

                const stablePredictions = predictionBuffer.filter(p => p.letter === stableLetter);
                if (stablePredictions.length > 0) {
                     avgScore = stablePredictions.reduce((sum, p) => sum + p.score, 0) / stablePredictions.length;
                }

                if (window.handleDetection) {
                    window.handleDetection(stableLetter, avgScore);
                }
            }
        });
    });

    // Initialize Camera Utilities for MediaPipe
    if (videoElement) {
        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({image: videoElement});
            },
            width: 640,
            height: 480
        });
        
        camera.start()
            .then(() => {
                if (overlayElement) overlayElement.classList.add('hidden');
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
                if (statusText) {
                    statusText.textContent = "Camera access denied or unavailable.";
                    statusText.classList.add('error-text');
                }
            });
    }
});
