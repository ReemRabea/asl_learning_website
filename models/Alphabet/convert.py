
import tensorflow as tf
import tensorflowjs as tfjs
import shutil, os

model_path = r'C:\Users\rrree\ASLproject\AlphabetModel\landmarks_model.h5'
labels_path = r'C:\Users\rrree\ASLproject\AlphabetModel\class_indices.json'
output_path = r'C:\Users\rrree\ASLproject\AlphabetModel\web_model'

print("Loading model...")
model = tf.keras.models.load_model(model_path)
model.summary()

print("Converting to TFJS...")
os.makedirs(output_path, exist_ok=True)
tfjs.converters.save_keras_model(model, output_path)

shutil.copy2(labels_path, os.path.join(output_path, 'class_indices.json'))
print("Done!")


