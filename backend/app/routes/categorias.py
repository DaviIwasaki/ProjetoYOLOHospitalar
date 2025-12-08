# app/routes/categorias.py

from flask import Blueprint, jsonify, request
from app import db
from app.models.categoria import Categoria
from app.routes.auth import token_required

categorias_bp = Blueprint('categorias', __name__)

# ============================
# Criar categoria
# ============================
@categorias_bp.route('/categorias', methods=['POST'])
@token_required
def criar_categoria(current_user):
    data = request.get_json()
    nome = data.get("nome")
    descricao = data.get("descricao")

    if not nome:
        return jsonify({'message': 'Nome é obrigatório'}), 400

    if Categoria.query.filter_by(nome=nome).first():
        return jsonify({'message': 'Categoria já existe'}), 409

    nova = Categoria(nome=nome, descricao=descricao)
    db.session.add(nova)
    db.session.commit()

    return jsonify({'message': "Categoria criada com sucesso"}), 201


# ============================
# Listar categorias
# ============================
@categorias_bp.route('/categorias', methods=['GET'])
@token_required
def listar_categorias(current_user):
    categorias = Categoria.query.all()

    data = [
        {"id": c.id, "nome": c.nome, "descricao": c.descricao}
        for c in categorias
    ]

    return jsonify(data), 200
