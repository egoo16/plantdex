import tensorflow as keras
from keras._tf_keras.keras.preprocessing.image import ImageDataGenerator
from keras._tf_keras.keras.models import Sequential
from keras._tf_keras.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


train_dir = "PlantVillage/train"
val_dir = "PlantVillage/validation"

# Generadores de imágenes con aumentos para entrenar (opcional, pero recomendado)
train_datagen = ImageDataGenerator(
    rescale=1.0/255.0,
    rotation_range=30,      # Rotación aleatoria
    width_shift_range=0.2,  # Desplazamiento horizontal aleatorio
    height_shift_range=0.2, # Desplazamiento vertical aleatorio
    shear_range=0.2,        # Shear (corte) aleatorio
    zoom_range=0.2,         # Zoom aleatorio
    horizontal_flip=True,   # Flip horizontal aleatorio
    fill_mode='nearest'     # Rellenar los pixeles faltantes
)

val_datagen = ImageDataGenerator(rescale=1.0/255.0)

# Generadores de entrenamiento y validación
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(128, 128),  # Puedes ajustar el tamaño de la imagen
    batch_size=32,
    class_mode="categorical" # Dado que tienes múltiples clases
)

val_generator = val_datagen.flow_from_directory(
    val_dir,
    target_size=(128, 128),  # Ajuste al mismo tamaño de imagen
    batch_size=32,
    class_mode="categorical"
)

# Modelo CNN
model = Sequential([
    Conv2D(32, (3, 3), activation="relu", input_shape=(128, 128, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation="relu"),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation="relu"),
    Dense(train_generator.num_classes, activation="softmax")  # Número de clases de salida
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Entrenamiento
history = model.fit(
    train_generator,
    epochs=10,                # Puedes aumentar el número de épocas
    validation_data=val_generator
)

# Guardar el modelo
model_save_path = "app/data/plant_model.h5"
if not os.path.exists(os.path.dirname(model_save_path)):
    os.makedirs(os.path.dirname(model_save_path))

model.save(model_save_path)

print(f"Modelo entrenado y guardado como '{model_save_path}'")