# app/models/movimentacao.py
from .. import db
from datetime import datetime

class Movimentacao(db.Model):
    __tablename__ = 'movimentacoes'
    id = db.Column(db.Integer, primary_key=True)
    instrumento_id = db.Column(db.Integer, db.ForeignKey('instrumentos.id'), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'entrada' ou 'saida'
    quantidade = db.Column(db.Integer, nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    responsavel = db.Column(db.String(100), nullable=False)
    origem_destino = db.Column(db.String(100), nullable=True)
    notas = db.Column(db.Text, nullable=True)
    maleta_id = db.Column(db.Integer, db.ForeignKey('maletas.id'), nullable=True)  # opcional

    instrumento = db.relationship('Instrumento', backref='movimentacoes')

    def to_dict(self):
        return {
            "id": self.id,
            "instrumento_nome": self.instrumento.nome,
            "tipo": self.tipo,
            "quantidade": self.quantidade,
            "data": self.data.isoformat(),
            "responsavel": self.responsavel,
            "origem_destino": self.origem_destino,
            "notas": self.notas
        }