import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'dev-secret-2025'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f"mysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = False  # True para debug SQL

class ProductionConfig(Config):
    DEBUG = False

# Use DevelopmentConfig por padrão