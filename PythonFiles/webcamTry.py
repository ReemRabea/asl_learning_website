import cv2
import numpy as np
import tensorflow as tf
import mediapipe as mp
import json
from collections import deque


import zipfile, h5py

weights_extract = r'C:\Users\rrree\Downloads\VideosDATASET\keras_extracted'

inputs = tf.keras.Input(shape=(60, 126), name='asl_input')
x = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128, return_sequences=True), name='bi_1')(inputs)
x = tf.keras.layers.LayerNormalization(name='ln_1')(x)
x = tf.keras.layers.Dropout(0.4, name='dropout_1')(x)
x = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128), name='bi_2')(x)
x = tf.keras.layers.LayerNormalization(name='ln_2')(x)
x = tf.keras.layers.Dropout(0.4, name='dropout_2')(x)
x = tf.keras.layers.Dense(256, activation='relu', name='dense_256')(x)
x = tf.keras.layers.Dropout(0.3, name='dropout_d1')(x)
x = tf.keras.layers.Dense(128, activation='relu', name='dense_128')(x)
outputs = tf.keras.layers.Dense(35, activation='softmax', name='dense_output')(x)
model = tf.keras.Model(inputs, outputs)

with h5py.File(weights_extract + '/model.weights.h5', 'r') as f:
    def g(p): return np.array(f[p])
    model.get_layer('bi_1').forward_layer.cell.set_weights([g('layers/bidirectional/forward_layer/cell/vars/0'), g('layers/bidirectional/forward_layer/cell/vars/1'), g('layers/bidirectional/forward_layer/cell/vars/2')])
    model.get_layer('bi_1').backward_layer.cell.set_weights([g('layers/bidirectional/backward_layer/cell/vars/0'), g('layers/bidirectional/backward_layer/cell/vars/1'), g('layers/bidirectional/backward_layer/cell/vars/2')])
    model.get_layer('ln_1').set_weights([g('layers/layer_normalization/vars/0'), g('layers/layer_normalization/vars/1')])
    model.get_layer('bi_2').forward_layer.cell.set_weights([g('layers/bidirectional_1/forward_layer/cell/vars/0'), g('layers/bidirectional_1/forward_layer/cell/vars/1'), g('layers/bidirectional_1/forward_layer/cell/vars/2')])
    model.get_layer('bi_2').backward_layer.cell.set_weights([g('layers/bidirectional_1/backward_layer/cell/vars/0'), g('layers/bidirectional_1/backward_layer/cell/vars/1'), g('layers/bidirectional_1/backward_layer/cell/vars/2')])
    model.get_layer('ln_2').set_weights([g('layers/layer_normalization_1/vars/0'), g('layers/layer_normalization_1/vars/1')])
    model.get_layer('dense_256').set_weights([g('layers/dense/vars/0'), g('layers/dense/vars/1')])
    model.get_layer('dense_128').set_weights([g('layers/dense_1/vars/0'), g('layers/dense_1/vars/1')])
    model.get_layer('dense_output').set_weights([g('layers/dense_2/vars/0'), g('layers/dense_2/vars/1')])

print("Model loaded!")

# Load labels
with open(r"C:\Users\rrree\Downloads\VideosDATASET\words_labels.json", "r") as f:
    labels = json.load(f)

# Mediapipe setup
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

base_options = python.BaseOptions(model_asset_path='hand_landmarker.task')
options = vision.HandLandmarkerOptions(base_options=base_options, num_hands=2)
detector = vision.HandLandmarker.create_from_options(options)

# Sequence buffer
sequence = deque(maxlen=60)

def normalize_hand(hand_lms):
    lms = np.array(hand_lms).reshape(-1, 3)
    wrist = lms[0]
    lms = lms - wrist

    max_dist = np.max(np.linalg.norm(lms[:, :2], axis=1))
    if max_dist > 0:
        lms = lms / max_dist

    lms[:, 2] = 0
    return lms.flatten().tolist()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

    result = detector.detect(mp_image)

    frame_landmarks = []

    if result.hand_landmarks:
        h1 = []
        for lm in result.hand_landmarks[0]:
            h1.extend([lm.x, lm.y, lm.z])
        frame_landmarks.extend(normalize_hand(h1))

        if len(result.hand_landmarks) > 1:
            h2 = []
            for lm in result.hand_landmarks[1]:
                h2.extend([lm.x, lm.y, lm.z])
            frame_landmarks.extend(normalize_hand(h2))
        else:
            frame_landmarks.extend([0]*63)
    else:
        frame_landmarks.extend([0]*126)

    sequence.append(frame_landmarks)

    if len(sequence) == 60:
        input_data = np.expand_dims(sequence, axis=0)
        prediction = model.predict(input_data, verbose=0)
        predicted_class = np.argmax(prediction)
        confidence = np.max(prediction)

        word = labels[str(predicted_class)]

        cv2.putText(frame, f"{word} ({confidence:.2f})",
                    (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0,255,0), 2)

    cv2.imshow("ASL Webcam", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()