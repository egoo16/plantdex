from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_restx import Api, Resource, reqparse
from flask_cors import CORS

# Crear la aplicación Flask
app = Flask(__name__)

# Crear la instancia de la API Swagger
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

# Definir el parser de entrada para Swagger
parser = reqparse.RequestParser()
parser.add_argument('image', type='file', location='files', required=True, help='Imagen para predecir')

# Definir el recurso de predicción
@api.route('/predict')
class Predict(Resource):
    def post(self):
        if model is None:
            return {'error': 'Modelo no cargado'}, 500
        
        # Parsear la imagen de la solicitud
        args = parser.parse_args()
        file = args['image']
        
        try:
            image = Image.open(file).resize((128, 128))  # Asegúrate de que el tamaño sea compatible con tu modelo
            image_array = np.expand_dims(np.array(image) / 255.0, axis=0)
            predictions = model.predict(image_array)
            class_id = np.argmax(predictions)
            confidence = predictions[0][class_id]
            return {'class_id': int(class_id), 'confidence': float(confidence)}
        except Exception as e:
            return {'error': str(e)}, 400

# Iniciar la aplicación Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
