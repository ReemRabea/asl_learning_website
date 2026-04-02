// Placeholder for Numbers Model (Level 2)
document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('webcam-video');
    const overlayElement = document.getElementById('video-overlay');
    const statusText = document.getElementById('camera-status');

    if (statusText) statusText.textContent = "Numbers Model (Level 2) - Not Connected Yet";

    // Initialize Camera Utilities ONLY (No MediaPipe/Model for now)
    if (videoElement) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            if (overlayElement) overlayElement.classList.add('hidden');
        } catch (err) {
            console.error("Error accessing webcam for Digits: ", err);
        }
    }
});
