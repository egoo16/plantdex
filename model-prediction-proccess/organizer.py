import os
import shutil

base_dir = "PlantVillage"  

train_dir = os.path.join(base_dir, 'train')
val_dir = os.path.join(base_dir, 'validation')

plant_classes = ['Apple', 'Bell Pepper', 'Cherry', 'Corn (Maize)', 'Grape', 'Peach', 'Potato', 'Strawberry', 'Tomato']

if not os.path.exists(train_dir):
    os.makedirs(train_dir)
if not os.path.exists(val_dir):
    os.makedirs(val_dir)

def move_images(plant_name):
    plant_base_dir = os.path.join(base_dir, plant_name)
    train_plant_dir = os.path.join(plant_base_dir, 'Train')
    val_plant_dir = os.path.join(plant_base_dir, 'Val')

    for folder in os.listdir(train_plant_dir):
        class_train_dir = os.path.join(train_dir, folder)
        if not os.path.exists(class_train_dir):
            os.makedirs(class_train_dir)

        class_folder = os.path.join(train_plant_dir, folder)
        for filename in os.listdir(class_folder):
            file_path = os.path.join(class_folder, filename)
            if os.path.isfile(file_path):
                shutil.move(file_path, os.path.join(class_train_dir, filename))

    for folder in os.listdir(val_plant_dir):
        class_val_dir = os.path.join(val_dir, folder)
        if not os.path.exists(class_val_dir):
            os.makedirs(class_val_dir)

        class_folder = os.path.join(val_plant_dir, folder)
        for filename in os.listdir(class_folder):
            file_path = os.path.join(class_folder, filename)
            if os.path.isfile(file_path):
                shutil.move(file_path, os.path.join(class_val_dir, filename))

for plant in plant_classes:
    move_images(plant)
    print(f"Imágenes de {plant} reorganizadas correctamente.")

print("Reestructuración completada.")
