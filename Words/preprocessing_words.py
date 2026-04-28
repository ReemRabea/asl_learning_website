import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import os
import json
import numpy as np
import pickle

# Paths
BASE_DIR = r'C:\Users\rrree\OneDrive\Desktop\ASL\models\Words'
VIDEOS_DIR = r'C:\Users\rrree\OneDrive\Desktop\videos'
OUTPUT_PATH = os.path.join(BASE_DIR, 'preprocessed_words.pickle')
MODEL_PATH = os.path.join(BASE_DIR, 'hand_landmarker.task')

MAPPING_PATH = os.path.join(BASE_DIR, 'final_curriculum_mapping.json')

def normalize_hand(hand_lms):
    """Normalizes a single hand's landmarks (21 points)"""
    lms = np.array(hand_lms).reshape(-1, 3)
    wrist = lms[0]
    lms = lms - wrist
    
    xy_dists = np.linalg.norm(lms[:, :2], axis=1)
    max_dist = np.max(xy_dists)
    if max_dist > 0:
        lms = lms / max_dist
    
    lms[:, 2] = 0 # Zero out Z for now to match 2D focus
    return lms.flatten().tolist()

def extract_landmarks(video_path, detector):
    cap = cv2.VideoCapture(video_path)
    sequence = []
    
    if not cap.isOpened():
        return None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)
        
        detection_result = detector.detect(mp_image)
        
        frame_landmarks = []
        if detection_result.hand_landmarks:
            # Process first hand
            h1 = []
            for lm in detection_result.hand_landmarks[0]:
                h1.extend([lm.x, lm.y, lm.z])
            frame_landmarks.extend(normalize_hand(h1))
            
            # Process second hand if exists
            if len(detection_result.hand_landmarks) > 1:
                h2 = []
                for lm in detection_result.hand_landmarks[1]:
                    h2.extend([lm.x, lm.y, lm.z])
                frame_landmarks.extend(normalize_hand(h2))
            else:
                frame_landmarks.extend([0] * 63)
        else:
            # No hands detected
            frame_landmarks.extend([0] * 126)
            
        sequence.append(frame_landmarks)
        if len(sequence) >= 60: # Limit to 60 frames for now
            break
            
    cap.release()
    
    # Pad if shorter than 60
    while len(sequence) < 60:
        sequence.append([0] * 126)
        
    return sequence[:60]

def augment_sequence(seq, num_augments=5):
    """Generates synthetic variations of a landmark sequence"""
    augments = []
    seq_np = np.array(seq) # (60, 126)
    
    for _ in range(num_augments):
        # 1. Coordinate Noise (Shaky hands)
        noise = np.random.normal(0, 0.003, seq_np.shape)
        aug_seq = seq_np + noise
        
        # 2. Scaling (Distance change) 0.9x to 1.1x
        scale = np.random.uniform(0.9, 1.1)
        aug_seq = aug_seq * scale
        
        # 3. Spatial Shift (Position change)
        shift = np.random.uniform(-0.03, 0.03, (1, 126))
        aug_seq = aug_seq + shift
        
        # 4. Temporal Jitter (Randomly re-sample a few frames to simulate speed)
        # We'll just randomly jitter the indices slightly
        indices = np.arange(60)
        jittered_indices = np.sort(np.random.choice(60, 60, replace=True))
        aug_seq = aug_seq[jittered_indices]
        
        augments.append(aug_seq.tolist())
        
    return augments

def main():
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model file not found at {MODEL_PATH}")
        return

    base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
    options = vision.HandLandmarkerOptions(base_options=base_options,
                                           num_hands=2,
                                           min_hand_detection_confidence=0.5)
    detector = vision.HandLandmarker.create_from_options(options)

    processed_data = []
    labels = []
    
    if not os.path.exists(MAPPING_PATH):
        print(f"Error: Mapping file not found at {MAPPING_PATH}")
        return
        
    with open(MAPPING_PATH, 'r') as f:
        targets = json.load(f)
        
    print(f"Processing {len(targets)} samples with Aggressive Augmentation...")
    
    for i, target in enumerate(targets):
        video_path = os.path.join(VIDEOS_DIR, target['video'])
        if os.path.exists(video_path):
            print(f"[{i+1}/{len(targets)}] {target['label']}...")
            seq = extract_landmarks(video_path, detector)
            if seq:
                # Add Original
                processed_data.append(seq)
                labels.append(target['label'])
                
                # Add Mirroring (already useful)
                mirrored_seq = []
                for frame in seq:
                    mirrored_frame = frame.copy()
                    for j in range(21):
                        mirrored_frame[j * 3] = -mirrored_frame[j * 3]
                        mirrored_frame[63 + j * 3] = -mirrored_frame[63 + j * 3]
                    mirrored_seq.append(mirrored_frame)
                processed_data.append(mirrored_seq)
                labels.append(target['label'])
                
                # Add Advanced Augments (5 per video)
                synthetic_variants = augment_sequence(seq, num_augments=5)
                for variant in synthetic_variants:
                    processed_data.append(variant)
                    labels.append(target['label'])
                
                # Also augment the mirrored version
                synthetic_mirrored = augment_sequence(mirrored_seq, num_augments=3)
                for variant in synthetic_mirrored:
                    processed_data.append(variant)
                    labels.append(target['label'])
        else:
            continue

    with open(OUTPUT_PATH, 'wb') as f:
        pickle.dump({'data': processed_data, 'labels': labels}, f)
    
    print(f"Saved {len(processed_data)} samples (Original + Integrated Augmentation) to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
