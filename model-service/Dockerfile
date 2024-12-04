FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# Instalar gunicorn para producción
RUN pip install gunicorn

# Usar gunicorn para correr la app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
