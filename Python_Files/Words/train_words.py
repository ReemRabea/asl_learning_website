import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import os

# Paths
BASE_DIR = r'C:\Users\rrree\OneDrive\Desktop\ASL\models\Words'
PICKLE_PATH = os.path.join(BASE_DIR, 'preprocessed_words.pickle')
MODEL_PATH = os.path.join(BASE_DIR, 'asl_words_model.keras')
LABELS_PATH = os.path.join(BASE_DIR, 'words_labels.json')

def train_model():
    if not os.path.exists(PICKLE_PATH):
        print(f"Error: {PICKLE_PATH} not found.")
        return

    print("Loading preprocessed data...")
    with open(PICKLE_PATH, 'rb') as f:
        data_dict = pickle.load(f)
        
    X = np.array(data_dict['data']) # Shape: (samples, 60, 126)
    y_raw = data_dict['labels']
    
    print(f"Loaded {X.shape[0]} samples with shape {X.shape[1:]}")
    
    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y_raw)
    num_classes = len(label_encoder.classes_)
    y = to_categorical(y_encoded, num_classes=num_classes)
    
    print(f"Successfully encoded {num_classes} classes.")
    
    # Save label mapping for frontend
    import json
    label_mapping = {int(i): label for i, label in enumerate(label_encoder.classes_)}
    with open(LABELS_PATH, 'w') as f:
        json.dump(label_mapping, f)
    print(f"Saved label mapping to {LABELS_PATH}")

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    from tensorflow.keras.layers import Bidirectional, LayerNormalization, Input
    from tensorflow.keras.models import Model
    
    # Build Robust Bi-LSTM Functional Model (V6)
    inputs = Input(shape=(60, 126), name='asl_input')
    
    x = Bidirectional(LSTM(128, return_sequences=True, name='lstm_v6_1'), name='bi_1')(inputs)
    x = LayerNormalization(name='ln_1')(x)
    x = Dropout(0.4, name='dropout_1')(x)
    
    x = Bidirectional(LSTM(128, return_sequences=False, name='lstm_v6_2'), name='bi_2')(x)
    x = LayerNormalization(name='ln_2')(x)
    x = Dropout(0.4, name='dropout_2')(x)
    
    x = Dense(256, activation='relu', name='dense_256')(x)
    x = Dropout(0.3, name='dropout_d1')(x)
    x = Dense(128, activation='relu', name='dense_128')(x)
    outputs = Dense(num_classes, activation='softmax', name='dense_output')(x)
    
    model = Model(inputs=inputs, outputs=outputs, name='asl_v6_functional')

    optimizer = tf.keras.optimizers.Adam(learning_rate=0.0003)
    model.compile(optimizer=optimizer, 
                  loss='categorical_crossentropy', 
                  metrics=['accuracy'])
    
    print(model.summary())

    # Train (V6)
    print("Starting training (V6 Functional)...")
    history = model.fit(X_train, y_train, 
                        epochs=150, 
                        batch_size=32, 
                        validation_data=(X_test, y_test),
                        callbacks=[
                            tf.keras.callbacks.EarlyStopping(patience=20, restore_best_weights=True)
                        ])

    # Save model
    model.save(MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

    # Evaluate
    loss, accuracy = model.evaluate(X_test, y_test)
    print(f"Test Accuracy: {accuracy*100:.2f}%")

if __name__ == "__main__":
    train_model()
