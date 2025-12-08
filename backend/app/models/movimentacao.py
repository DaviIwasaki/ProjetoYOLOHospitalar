from .. import db
from datetime import datetime

class Movimentacao(db.Model):
    __tablename__ = 'movimentacoes'
    id = db.Column(db.Integer, primary_key=True)
    instrumento_id = db.Column(db.Integer, db.ForeignKey('instrumentos.id'), nullable=False)
    maleta_id = db.Column(db.Integer, db.ForeignKey('maletas.id'), nullable=True)
    tipo = db.Column(db.String(20), nullable=False)  # entrada, saida, transferencia
    quantidade = db.Column(db.Integer, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.utcnow)
    localizacao = db.Column(db.String(100), nullable=True)

    instrumento = db.relationship('Instrumento', backref='movimentacoes')
    maleta = db.relationship('Maleta', backref='movimentacoes')
    usuario = db.relationship('User', backref='movimentacoes')

    def __repr__(self):
        return f"<Movimentacao {self.tipo} {self.quantidade} {self.instrumento.nome}>"