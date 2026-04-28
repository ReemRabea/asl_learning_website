import os
import json
import shutil
import sys
import numpy as np

# Patch for NumPy version issues with TFJS
np.object = object
np.bool = bool
np.complex = complex
np.int = int
np.float = float

# Fix for Protobuf Error
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

import tensorflow as tf

# Patch for tensorflow-hub (TF 2.15+) missing tracking
try:
    from tensorflow.python.trackable import data_structures
    import tensorflow.python.training as training
    training.tracking = type('tracking', (object,), {'data_structures': data_structures})
    sys.modules['tensorflow.python.training.tracking'] = training.tracking
    sys.modules['tensorflow.python.training.tracking.data_structures'] = data_structures
except ImportError:
    pass

from tensorflow import keras
from tensorflow.keras import layers, regularizers
import tensorflowjs as tfjs

model_path = r'C:\Users\rrree\ASLproject\models\Digits\digits_landmarks_model.h5'
output_path = r'C:\Users\rrree\ASLproject\models\Digits\digits_web_model'
labels_path = r'C:\Users\rrree\ASLproject\models\Digits\digits_class_indices.json'

def build_mlp(input_size=63, num_classes=10):
    inputs = keras.Input(shape=(input_size,), name='landmarks')

    # Layer 1
    x = layers.Dense(512, use_bias=False,
                      kernel_regularizer=regularizers.l2(1e-4))(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.ReLU()(x)
    x = layers.Dropout(0.40)(x)

    # Layer 2
    x = layers.Dense(256, use_bias=False,
                      kernel_regularizer=regularizers.l2(1e-4))(x)
    x = layers.BatchNormalization()(x)
    x = layers.ReLU()(x)
    x = layers.Dropout(0.35)(x)

    # Layer 3
    x = layers.Dense(128, use_bias=False,
                      kernel_regularizer=regularizers.l2(1e-4))(x)
    x = layers.BatchNormalization()(x)
    x = layers.ReLU()(x)
    x = layers.Dropout(0.30)(x)

    # Output  10 digits
    outputs = layers.Dense(num_classes, activation='softmax')(x)

    return keras.Model(inputs, outputs, name='ASL_Digits_MLP')

print("Building exact model architecture to bypass old Keras serialization quirks...")
model = build_mlp()

print("Loading weights...")
try:
    model.load_weights(model_path)
except Exception as e:
    print("Could not load full weights:", e)
    print("Attempting to load weights by name with skip_mismatch=True...")
    model.load_weights(model_path, by_name=True, skip_mismatch=True)

model.summary()

print("Converting to TFJS...")
os.makedirs(output_path, exist_ok=True)
tfjs.converters.save_keras_model(model, output_path)

if not os.path.exists(labels_path):
    print("No existing class_indices found, generating labels (0-9).")
    classes = {str(i): i for i in range(10)}
    with open(labels_path, 'w') as f:
        json.dump(classes, f)

shutil.copy2(labels_path, os.path.join(output_path, 'digits_class_indices.json'))
print("Done! TFJS model and labels saved to", output_path)
