from flask import Flask, request, jsonify
from flask_restx import Api, Resource, reqparse
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import werkzeug

# Crear la aplicación Flask
app = Flask(__name__)
api = Api(app, version='1.0', title='Servicio de Predicción de Plantas',
          description='Una API para predecir la clase de plantas a partir de imágenes')

# Habilitar CORS
CORS(app)

# Cargar el modelo de TensorFlow
try:
    model = tf.keras.models.load_model("plant_model.h5")
except Exception as e:
    print(f"Error al cargar el modelo: {e}")
    model = None

# Definir el parser para archivos en Swagger
parser = reqparse.RequestParser()
parser.add_argument(
    'image',
    type=werkzeug.datastructures.FileStorage,
    location='files',
    required=True,
    help='Sube una imagen para predicción (formatos soportados: JPEG, PNG, BMP)'
)

# Definir el recurso de predicción
@api.route('/predict')
class Predict(Resource):
    @api.expect(parser)
    def post(self):
        # Verificar si el modelo está cargado
        if model is None:
            return {'error': 'Modelo no cargado'}, 500

        # Parsear los argumentos (archivo)
        args = parser.parse_args()
        file = args['image']  # Archivo subido

        try:
            # Validar y procesar la imagen
            image = Image.open(file)
            if image.format not in ['JPEG', 'PNG', 'BMP']:
                return {'error': 'Formato de imagen no soportado. Usa JPEG, PNG o BMP.'}, 400
            
            # Redimensionar y normalizar la imagen para el modelo
            image = image.resize((128, 128))
            image_array = np.expand_dims(np.array(image) / 255.0, axis=0)

            # Realizar la predicción
            predictions = model.predict(image_array)
            class_id = np.argmax(predictions)
            confidence = predictions[0][class_id]
            
            return {
                'class_id': int(class_id),
                'confidence': float(confidence)
            }

        except Exception as e:
            return {'error': f'Error procesando la imagen: {str(e)}'}, 400

# Iniciar la aplicación Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
