# app/routes/api.py
from flask import Blueprint, request, jsonify
from app import db
from app.models import maleta_instrumento
from app.models import (
    Categoria, Instrumento, Maleta,
    Movimentacao, Ocorrencia, User, Role
)
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from ..models.instrumento import Instrumento
from ..models.movimentacao import Movimentacao

api_bp = Blueprint('api', __name__)

# ==================== CATEGORIAS ====================
@api_bp.route('/categorias', methods=['GET'])
def listar_categorias():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    cats = Categoria.query.paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        "data": [{"id": c.id, "nome": c.nome, "descricao": c.descricao} for c in cats.items],
        "total": cats.total,
        "pages": cats.pages,
        "page": page
    })

@api_bp.route('/categorias', methods=['POST'])
def criar_categoria():
    data = request.get_json()
    if not data or not data.get('nome'):
        return jsonify({"message": "Nome obrigatório"}), 400
    cat = Categoria(nome=data['nome'], descricao=data.get('descricao'))
    db.session.add(cat)
    try:
        db.session.commit()
        return jsonify({"message": "Categoria criada", "id": cat.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Categoria já existe"}), 409

# ==================== INSTRUMENTOS ====================
@api_bp.route('/instrumentos', methods=['GET'])
def listar_instrumentos():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    query = Instrumento.query
    if search:
        query = query.filter(Instrumento.nome.ilike(f"%{search}%") | Instrumento.codigo_interno.ilike(f"%{search}%"))
    insts = query.paginate(page=page, per_page=20, error_out=False)
    return jsonify({
        "data": [{
            "id": i.id,
            "codigo_interno": i.codigo_interno,
            "nome": i.nome,
            "categoria": i.categoria.nome if i.categoria else None,
            "quantidade_estoque": i.quantidade_estoque,
            "estoque_minimo": i.estoque_minimo,
            "estoque_maximo": i.estoque_maximo,
            "validade": i.validade.isoformat() if i.validade else None,
            "qr_code": i.qr_code
        } for i in insts.items],
        "total": insts.total,
        "pages": insts.pages
    })

@api_bp.route('/instrumentos', methods=['POST'])
def criar_instrumento():
    data = request.get_json()
    required = ['nome', 'categoria_id']
    if not all(k in data for k in required):
        return jsonify({"message": "Nome e categoria obrigatórios"}), 400

    cat = Categoria.query.get(data['categoria_id'])
    if not cat:
        return jsonify({"message": "Categoria não existe"}), 404

    codigo = data.get('codigo_interno', f"INST-{datetime.now().strftime('%Y%m%d%H%M%S')}")  # auto se não fornecido

    inst = Instrumento(
        codigo_interno=codigo,
        nome=data['nome'],
        categoria_id=data['categoria_id'],
        validade=datetime.strptime(data.get('validade'), '%Y-%m-%d') if data.get('validade') else None,
        quantidade_estoque=data.get('quantidade_estoque', 0),
        estoque_minimo=data.get('estoque_minimo', 0),
        estoque_maximo=data.get('estoque_maximo', 9999)
    )
    inst.generate_qr_code()
    db.session.add(inst)
    try:
        db.session.commit()
        return jsonify({"message": "Instrumento criado", "id": inst.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Código interno já existe"}), 409

# ==================== MALETAS ====================
@api_bp.route('/maletas', methods=['GET'])
def listar_maletas():
    maletas = Maleta.query.all()
    result = []
    for m in maletas:
        composicao = db.session.execute(
            maleta_instrumento.select().where(maleta_instrumento.c.maleta_id == m.id)
        ).fetchall()
        result.append({
            "id": m.id,
            "nome": m.nome,
            "codigo_maleta": m.codigo_maleta,
            "descricao": m.descricao,
            "composicao": [
                {
                    "instrumento_id": row.instrumento_id,
                    "nome": Instrumento.query.get(row.instrumento_id).nome,
                    "quantidade_ideal": row.quantidade_ideal
                } for row in composicao
            ]
        })
    return jsonify(result)

@api_bp.route('/maletas', methods=['POST'])
def criar_maleta():
    data = request.get_json()
    required = ['nome', 'codigo_maleta']
    if not all(k in data for k in required):
        return jsonify({"message": "Nome e código obrigatórios"}), 400

    maleta = Maleta(
        nome=data['nome'],
        codigo_maleta=data['codigo_maleta'],
        descricao=data.get('descricao')
    )
    db.session.add(maleta)
    db.session.flush()

    composicao = data.get('composicao', [])
    for item in composicao:
        inst = Instrumento.query.get(item['instrumento_id'])
        if not inst:
            db.session.rollback()
            return jsonify({"message": f"Instrumento ID {item['instrumento_id']} não existe"}), 404
        db.session.execute(
            maleta_instrumento.insert().values(
                maleta_id=maleta.id,
                instrumento_id=item['instrumento_id'],
                quantidade_ideal=item.get('quantidade_ideal', 1)
            )
        )
    db.session.commit()
    return jsonify({"message": "Maleta criada", "id": maleta.id}), 201

# ==================== MOVIMENTAÇÕES ====================
@api_bp.route('/movimentacoes', methods=['POST'])
def registrar_movimentacao():
    data = request.get_json()
    required = ['instrumento_id', 'tipo', 'quantidade']
    if not all(k in data for k in required):
        return jsonify({"message": "Faltam dados"}), 400

    inst = Instrumento.query.get(data['instrumento_id'])
    if not inst:
        return jsonify({"message": "Instrumento não existe"}), 404

    if data['tipo'] == 'saida' and inst.quantidade_estoque < data['quantidade']:
        return jsonify({"message": "Estoque insuficiente"}), 400

    # CORREÇÃO AQUI: cria um usuário padrão se não existir
    user = User.query.first()
    if not user:
        # Cria admin automático para testes
        admin_role = Role.query.filter_by(nome='administrador').first()
        if not admin_role:
            admin_role = Role(nome='administrador')
            db.session.add(admin_role)
            db.session.commit()
        user = User(username='admin_auto', email='auto@hospital.com', role=admin_role)
        user.set_password('123')
        db.session.add(user)
        db.session.commit()

    mov = Movimentacao(
        instrumento_id=data['instrumento_id'],
        maleta_id=data.get('maleta_id'),
        tipo=data['tipo'],
        quantidade=data['quantidade'],
        usuario_id=user.id,
        localizacao=data.get('localizacao')
    )
    db.session.add(mov)

    if data['tipo'] == 'entrada':
        inst.quantidade_estoque += data['quantidade']
    elif data['tipo'] == 'saida':
        inst.quantidade_estoque -= data['quantidade']

    db.session.commit()
    return jsonify({"message": "Movimentação registrada"}), 201

# ==================== OCORRÊNCIAS ====================
@api_bp.route('/ocorrencias', methods=['POST'])
def criar_ocorrencia():
    data = request.get_json()
    if not data or not data.get('descricao'):
        return jsonify({"message": "Descrição obrigatória"}), 400

    # MESMA CORREÇÃO: garante que existe um usuário
    user = User.query.first()
    if not user:
        admin_role = Role.query.filter_by(nome='administrador').first()
        if not admin_role:
            admin_role = Role(nome='administrador')
            db.session.add(admin_role)
            db.session.commit()
        user = User(username='admin_auto', email='auto@hospital.com', role=admin_role)
        user.set_password('123')
        db.session.add(user)
        db.session.commit()

    oc = Ocorrencia(
        instrumento_id=data.get('instrumento_id'),
        maleta_id=data.get('maleta_id'),
        usuario_id=user.id,
        descricao=data['descricao'],
        tipo=data.get('tipo', 'geral')
    )
    db.session.add(oc)
    db.session.commit()
    return jsonify({"message": "Ocorrência registrada", "id": oc.id}), 201

# ==================== LISTAR MOVIMENTAÇÕES ====================
@api_bp.route('/movimentacoes', methods=['GET'])
def listar_movimentacoes():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    movs = Movimentacao.query.order_by(Movimentacao.data_hora.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "data": [{
            "id": m.id,
            "tipo": m.tipo,
            "quantidade": m.quantidade,
            "instrumento": m.instrumento.nome if m.instrumento else None,
            "maleta": m.maleta.nome if m.maleta else None,
            "usuario": m.usuario.username,
            "localizacao": m.localizacao,
            "data_hora": m.data_hora.isoformat()
        } for m in movs.items],
        "total": movs.total,
        "pages": movs.pages,
        "page": page
    })


# ==================== LISTAR OCORRÊNCIAS ====================
@api_bp.route('/ocorrencias', methods=['GET'])
def listar_ocorrencias():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    ocs = Ocorrencia.query.order_by(Ocorrencia.data_hora.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        "data": [{
            "id": o.id,
            "descricao": o.descricao,
            "tipo": o.tipo,
            "status": o.status,
            "instrumento": o.instrumento.nome if o.instrumento else None,
            "maleta": o.maleta.nome if o.maleta else None,
            "usuario": o.usuario.username,
            "data_hora": o.data_hora.isoformat()
        } for o in ocs.items],
        "total": ocs.total,
        "pages": ocs.pages,
        "page": page
    })

# ==================== ALERTAS DE ESTOQUE ====================
@api_bp.route('/alertas/estoque', methods=['GET'])
def alertas_estoque():
    insts = Instrumento.query.filter(
        (Instrumento.quantidade_estoque < Instrumento.estoque_minimo) |
        (Instrumento.quantidade_estoque > Instrumento.estoque_maximo)
    ).all()
    return jsonify([{
        "id": i.id,
        "nome": i.nome,
        "estoque_atual": i.quantidade_estoque,
        "minimo": i.estoque_minimo,
        "maximo": i.estoque_maximo,
        "status": "baixo" if i.quantidade_estoque < i.estoque_minimo else "excesso"
    } for i in insts])
    
# ==================== CONFERIR USUÁRIO ====================
@api_bp.route('/debug/usuarios', methods=['GET'])
def debug_usuarios():
    users = User.query.all()
    return jsonify([{"id": u.id, "username": u.username} for u in users])

# ==================== ================= ====================
@api_bp.route('/products/by_yolo_class/<string:yolo_class>', methods=['GET'])
def get_product_by_yolo_class(yolo_class):
    # Primeiro tenta achar no banco por uma coluna que você pode adicionar: yolo_class
    # Se não tiver, faça busca por nome parecido ou crie mock
    instrumento = Instrumento.query.filter(
        db.func.lower(Instrumento.nome) == db.func.lower(yolo_class.replace("_", " "))
    ).first_or_none()

    if instrumento:
        return jsonify({
            "id": instrumento.id,
            "nome": instrumento.nome,
            "codigo_interno": instrumento.codigo_interno,
            "quantidade_estoque": instrumento.quantidade_estoque,
            "estoque_minimo": instrumento.estoque_minimo,
            "descricao": "Produto real do hospital"
        })

    # Mock para testes com YOLO padrão
    return jsonify({
        "id": None,
        "nome": yolo_class.replace("_", " ").title(),
        "codigo_interno": "TEST-" + yolo_class.upper(),
        "quantidade_estoque": 12,
        "estoque_minimo": 5,
        "descricao": "Produto de teste usando classe COCO do YOLOv8n"
    })
    
@api_bp.route('/movimentacoes/entrada', methods=['POST'])
def registrar_entrada():
    data = request.get_json()

    instrumento_id = data.get('instrumento_id')
    quantidade = data.get('quantidade')
    responsavel = data.get('responsavel', 'Usuário Anônimo')
    origem = data.get('origem')
    notas = data.get('notas')
    data_movimentacao = data.get('data')  # opcional, senão usa agora

    if not instrumento_id or not quantidade:
        return jsonify({"success": False, "message": "Instrumento e quantidade são obrigatórios"}), 400

    try:
        quantidade = int(quantidade)
        if quantidade <= 0:
            return jsonify({"success": False, "message": "Quantidade deve ser positiva"}), 400
    except ValueError:
        return jsonify({"success": False, "message": "Quantidade inválida"}), 400

    instrumento = Instrumento.query.get(instrumento_id)
    if not instrumento:
        return jsonify({"success": False, "message": "Instrumento não encontrado"}), 404

    # Cria movimentação
    movimentacao = Movimentacao(
        instrumento_id=instrumento_id,
        tipo='entrada',
        quantidade=quantidade,
        responsavel=responsavel,
        origem_destino=origem,
        notas=notas
    )

    if data_movimentacao:
        movimentacao.data = datetime.fromisoformat(data_movimentacao.replace('Z', '+00:00'))

    # Atualiza estoque
    instrumento.quantidade_estoque += quantidade

    db.session.add(movimentacao)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Entrada registrada com sucesso!",
        "movimentacao": movimentacao.to_dict(),
        "novo_estoque": instrumento.quantidade_estoque
    }), 201