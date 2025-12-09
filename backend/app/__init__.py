from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_socketio import SocketIO
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)  # Adicionado logger para debug

def create_app(config_class='app.config.DevelopmentConfig'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    socketio.init_app(app)

    login_manager.login_view = 'auth.login'
    login_message_category = 'info'

    from .models.user import User, Role

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # Serviço YOLO
    from .services.yolo_service import YoloService
    yolo_service = YoloService()

    # Socket.IO com logs
    @socketio.on('connect')
    def handle_connect():
        print("CLIENTE CONECTADO COM SUCESSO! Pronto para frames.")

    @socketio.on('disconnect')
    def handle_disconnect():
        print("Cliente desconectado.")

    @socketio.on('frame')
    def handle_frame(data):
        print("1. EVENTO 'FRAME' RECEBIDO DO CELULAR!")
        image = data.get('image')
        maleta_id = data.get('maleta_id')
        print(f"2. Tamanho da imagem base64: {len(image or '')} caracteres")

        if not image:
            print("3. ERRO: Imagem não enviada.")
            socketio.emit('detection_result', {"success": False, "error": "Imagem não enviada"})
            return

        result = yolo_service.process_frame(image, maleta_id)
        print("4. Enviando resultado para o frontend...")
        socketio.emit('detection_result', result)

    # Rota para servir o HTML de teste
    from flask import send_from_directory
    @app.route('/yolo_test')
    def yolo_test():
        return send_from_directory('static', 'yolo_test.html')

    return app