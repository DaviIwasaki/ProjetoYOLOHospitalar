# app/routes/auth.py
from flask import Blueprint, request, jsonify, current_app
from app import db
import jwt
from datetime import datetime, timedelta
from app.models.user import User, Role

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role_nome = data.get('role', 'operador')

    if not all([username, email, password]):
        return jsonify({'message': 'Faltam dados'}), 400

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Usuário já existe'}), 409

    role = Role.query.filter_by(nome=role_nome).first()
    if not role:
        return jsonify({'message': 'Cargo inválido'}), 400

    user = User(username=username, email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Usuário criado'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and user.check_password(data.get('password')) and user.ativo:
        token = jwt.encode({
            'user_id': user.id,
            'role': user.role.nome,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token, 'user': {
            'id': user.id, 'username': user.username, 'role': user.role.nome
        }}), 200
    return jsonify({'message': 'Credenciais inválidas'}), 401