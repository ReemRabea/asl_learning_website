document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('webcam-video');
    const overlayElement = document.getElementById('video-overlay');
    const statusText = document.getElementById('camera-status');

    let model = null;
    let labels = [];
    let isModelLoaded = false;
    
    // Temporal Buffer for Sequences
    let sequenceBuffer = [];
    const SEQUENCE_LENGTH = 60;
    const NUM_FEATURES = 126; // 2 hands * 21 landmarks * 3 coords (x,y,z)

    // Load TensorFlow Words Model
    try {
        if (statusText) statusText.textContent = "Loading Words Model...";
        // Load the model locally from the new path
        model = await tf.loadLayersModel('words_layers/model.json');
        
        // Load words labels
        const response = await fetch('words_labels.json');
        labels = await response.json(); 
        isModelLoaded = true;
        
        if (statusText) statusText.textContent = "Words Model Ready. Starting camera...";
    } catch (e) {
        console.error("Error loading Words model:", e);
        if (statusText) {
            statusText.textContent = `Error loading Words model: ${e.message}`;
            statusText.classList.add('error-text');
        }
    }

    // Initialize MediaPipe Hands
    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 2, // Supporting dual hands for Words model
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        selfieMode: false // Match unmirrored Python training data
    });

    // --- 🧮 Hand Landmark Normalization (Exact mirror of webcamTry.py) ---
    function normalizeHand(landmarks) {
        if (!landmarks || landmarks.length === 0) return new Array(63).fill(0);
        
        const wrist = landmarks[0];
        const normalized = [];
        let maxDist = 0;

        // 1. Shift relative to wrist (landmark 0) and flatten Z to 0
        const lms = landmarks.map(lm => ({
            x: lm.x - wrist.x,
            y: lm.y - wrist.y,
            z: 0 // Python: lms[:, 2] = 0
        }));

        // 2. Max distance in X/Y plane (Python: np.max(np.linalg.norm(lms[:, :2], axis=1)))
        lms.forEach(lm => {
            const dist = Math.sqrt(lm.x * lm.x + lm.y * lm.y);
            if (dist > maxDist) maxDist = dist;
        });

        // 3. Scale by maxDist
        if (maxDist > 0) {
            lms.forEach(lm => {
                normalized.push(lm.x / maxDist, lm.y / maxDist, 0);
            });
        } else {
            lms.forEach(() => normalized.push(0, 0, 0));
        }

        return normalized;
    }

    hands.onResults((results) => {
        if (!isModelLoaded) return;

        // --- Feature Extraction for 2 Hands ---
        let frameFeatures = [];
        
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            // Hand 1
            frameFeatures = frameFeatures.concat(normalizeHand(results.multiHandLandmarks[0]));

            // Hand 2 or Pad with Zeros
            if (results.multiHandLandmarks.length > 1) {
                frameFeatures = frameFeatures.concat(normalizeHand(results.multiHandLandmarks[1]));
            } else {
                frameFeatures = frameFeatures.concat(new Array(63).fill(0));
            }
        } else {
            // No hands detected: Complete 126-feature zero padding
            frameFeatures = new Array(126).fill(0);
        }

        // --- Sequence Management (Exactly 60 frames) ---
        sequenceBuffer.push(frameFeatures);
        if (sequenceBuffer.length > SEQUENCE_LENGTH) {
            sequenceBuffer.shift();
        }

        // Throttling: Only predict every 6 frames to save CPU (6 per second at 30fps)
        window.frameCounter = (window.frameCounter || 0) + 1;
        if (window.frameCounter % 6 !== 0) return;

        // Skip if a prediction is already in progress to avoid blocking the main thread
        if (window.isPredicting) return;

        // Wait until buffer is full before predicting
        if (sequenceBuffer.length === SEQUENCE_LENGTH) {
            window.isPredicting = true;
            const startTime = performance.now();

            tf.tidy(() => {
                const inputTensor = tf.tensor3d([sequenceBuffer]);
                const prediction = model.predict(inputTensor);
                
                // Use async data() to prevent UI freezing
                prediction.data().then(scores => {
                    const duration = (performance.now() - startTime).toFixed(1);
                    const maxScore = Math.max(...scores);
                    const maxIndex = scores.indexOf(maxScore);
                    const predictedWord = labels[maxIndex.toString()] || labels[maxIndex];

                    if (predictedWord && window.handleDetection) {
                        window.handleDetection(predictedWord, maxScore);
                    }
                    
                    window.isPredicting = false;
                    // console.log(`Word Prediction: ${predictedWord} (${(maxScore*100).toFixed(1)}%) in ${duration}ms`);
                }).catch(err => {
                    console.error("Inference Error:", err);
                    window.isPredicting = false;
                });
            });
        }
    });

    // Initialize Camera Utilities
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
            });
    }
});
