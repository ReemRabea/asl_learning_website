import tensorflow as tf
import tensorflowjs as tfjs
import zipfile, os, shutil, h5py, numpy as np

keras_path = r'C:\Users\rrree\Downloads\VideosDATASET\asl_words_model.keras'
weights_extract = r'C:\Users\rrree\Downloads\VideosDATASET\keras_extracted'
labels_src = r'C:\Users\rrree\Downloads\VideosDATASET\words_labels.json'
output_path = r'C:\Users\rrree\Downloads\VideosDATASET\words_layers'

print("Extracting weights...")
os.makedirs(weights_extract, exist_ok=True)
with zipfile.ZipFile(keras_path, 'r') as z:
    z.extractall(weights_extract)

print("Building model...")
inputs = tf.keras.Input(shape=(60, 126), name="asl_input")
x = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128, return_sequences=True), name="bi_1")(inputs)
x = tf.keras.layers.LayerNormalization(name="ln_1")(x)
x = tf.keras.layers.Dropout(0.4, name="dropout_1")(x)
x = tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128), name="bi_2")(x)
x = tf.keras.layers.LayerNormalization(name="ln_2")(x)
x = tf.keras.layers.Dropout(0.4, name="dropout_2")(x)
x = tf.keras.layers.Dense(256, activation='relu', name="dense_256")(x)
x = tf.keras.layers.Dropout(0.3, name="dropout_d1")(x)
x = tf.keras.layers.Dense(128, activation='relu', name="dense_128")(x)
outputs = tf.keras.layers.Dense(35, activation='softmax', name="dense_output")(x)
model = tf.keras.Model(inputs, outputs, name="asl_model")

print("Loading weights manually...")
w = os.path.join(weights_extract, 'model.weights.h5')
with h5py.File(w, 'r') as f:
    def g(path): return np.array(f[path])
    L = f['layers']
    # bi_1
    model.get_layer('bi_1').forward_layer.cell.set_weights([g('layers/bidirectional/forward_layer/cell/vars/0'), g('layers/bidirectional/forward_layer/cell/vars/1'), g('layers/bidirectional/forward_layer/cell/vars/2')])
    model.get_layer('bi_1').backward_layer.cell.set_weights([g('layers/bidirectional/backward_layer/cell/vars/0'), g('layers/bidirectional/backward_layer/cell/vars/1'), g('layers/bidirectional/backward_layer/cell/vars/2')])
    # ln_1
    model.get_layer('ln_1').set_weights([g('layers/layer_normalization/vars/0'), g('layers/layer_normalization/vars/1')])
    # bi_2
    model.get_layer('bi_2').forward_layer.cell.set_weights([g('layers/bidirectional_1/forward_layer/cell/vars/0'), g('layers/bidirectional_1/forward_layer/cell/vars/1'), g('layers/bidirectional_1/forward_layer/cell/vars/2')])
    model.get_layer('bi_2').backward_layer.cell.set_weights([g('layers/bidirectional_1/backward_layer/cell/vars/0'), g('layers/bidirectional_1/backward_layer/cell/vars/1'), g('layers/bidirectional_1/backward_layer/cell/vars/2')])
    # ln_2
    model.get_layer('ln_2').set_weights([g('layers/layer_normalization_1/vars/0'), g('layers/layer_normalization_1/vars/1')])
    # dense layers
    model.get_layer('dense_256').set_weights([g('layers/dense/vars/0'), g('layers/dense/vars/1')])
    model.get_layer('dense_128').set_weights([g('layers/dense_1/vars/0'), g('layers/dense_1/vars/1')])
    model.get_layer('dense_output').set_weights([g('layers/dense_2/vars/0'), g('layers/dense_2/vars/1')])

print("Converting to TFJS...")
os.makedirs(output_path, exist_ok=True)
tfjs.converters.save_keras_model(model, output_path)
shutil.copy2(labels_src, os.path.join(output_path, 'labels.json'))
print("Done!")