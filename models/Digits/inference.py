"""
ASL Digit Recognition — Webcam Inference Script
================================================
Corrected inference workflow:
  1. Capture the frame.
  2. Draw a central ROI box on the screen.
  3. Crop the image to that box.
  4. Optionally tighten via skin segmentation.
  5. Resize the crop to 64×64 and predict.
  6. Smooth predictions over 7 frames (majority-vote style averaging).
"""

import cv2
import numpy as np
from collections import deque
from tensorflow.keras.models import load_model

# ===========================================================================
# Configuration
# ===========================================================================
MODEL_PATH = "asl_cnn_model.keras"
IMAGE_SIZE = 64  # must match the training resolution
ROI_SIZE = 260   # side-length of the square Region of Interest
CONFIDENCE_THRESHOLD = 0.70
SMOOTH_WINDOW = 7

# ===========================================================================
# Load model
# ===========================================================================
print("Loading model …")
model = load_model(MODEL_PATH)
print(f"✅  Model loaded from {MODEL_PATH}")

# ===========================================================================
# Helper functions
# ===========================================================================
def preprocess_crop(crop, image_size=IMAGE_SIZE):
    """Match the training-time normalization: resize + scale to [0, 1]."""
    crop = cv2.resize(crop, (image_size, image_size),
                      interpolation=cv2.INTER_AREA)
    crop = crop.astype(np.float32) / 255.0
    return np.expand_dims(crop, axis=0)


def skin_bbox_from_crop(bgr_crop):
    """Return tight (x1, y1, x2, y2) bounding box of skin, or None."""
    if bgr_crop is None or bgr_crop.size == 0:
        return None

    ycrcb = cv2.cvtColor(bgr_crop, cv2.COLOR_BGR2YCrCb)
    lower = np.array([0, 133, 77], dtype=np.uint8)
    upper = np.array([255, 173, 127], dtype=np.uint8)
    mask = cv2.inRange(ycrcb, lower, upper)

    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return None

    c = max(contours, key=cv2.contourArea)
    area = cv2.contourArea(c)
    crop_area = bgr_crop.shape[0] * bgr_crop.shape[1]

    if area < 0.02 * crop_area:
        return None

    x, y, w, h = cv2.boundingRect(c)
    return (x, y, x + w, y + h)


# ===========================================================================
# Main loop
# ===========================================================================
cap = cv2.VideoCapture(0)
prob_history = deque(maxlen=SMOOTH_WINDOW)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    h, w, _ = frame.shape
    cx, cy = w // 2, h // 2

    # --- Define central ROI ---
    x1 = max(cx - ROI_SIZE // 2, 0)
    y1 = max(cy - ROI_SIZE // 2, 0)
    x2 = min(cx + ROI_SIZE // 2, w)
    y2 = min(cy + ROI_SIZE // 2, h)

    hand_crop = frame[y1:y2, x1:x2]

    label_text = "No hand"
    color = (0, 0, 255)

    if hand_crop.size != 0:
        # Tighten the crop using skin segmentation
        bbox = skin_bbox_from_crop(hand_crop)
        crop_for_model = hand_crop

        if bbox is not None:
            bx1, by1, bx2, by2 = bbox
            pad = int(0.15 * max(bx2 - bx1, by2 - by1))
            bx1 = max(bx1 - pad, 0)
            by1 = max(by1 - pad, 0)
            bx2 = min(bx2 + pad, hand_crop.shape[1])
            by2 = min(by2 + pad, hand_crop.shape[0])
            crop_for_model = hand_crop[by1:by2, bx1:bx2]

            # Draw skin bounding box on the full frame
            cv2.rectangle(frame,
                          (x1 + bx1, y1 + by1),
                          (x1 + bx2, y1 + by2),
                          (0, 255, 0), 2)

        roi = preprocess_crop(crop_for_model)
        probs = model.predict(roi, verbose=0)[0]

        prob_history.append(probs)
        avg_probs = np.mean(np.array(prob_history), axis=0)

        top_idx = int(np.argmax(avg_probs))
        top_conf = float(avg_probs[top_idx])

        if top_conf >= CONFIDENCE_THRESHOLD:
            label_text = f"Digit: {top_idx} ({top_conf:.2f})"
            color = (0, 255, 0)
        else:
            label_text = f"Uncertain ({top_conf:.2f})"
            color = (0, 255, 255)

    # --- Draw UI overlay ---
    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 2)
    cv2.putText(frame, "Place hand inside box", (20, 35),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    cv2.putText(frame, label_text, (20, 75),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

    cv2.imshow("ASL Digit Recognition", frame)

    if cv2.waitKey(1) & 0xFF == 27:  # ESC to quit
        break

cap.release()
cv2.destroyAllWindows()
