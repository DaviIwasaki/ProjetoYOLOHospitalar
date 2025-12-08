from .. import db
from datetime import datetime

class Ocorrencia(db.Model):
    __tablename__ = 'ocorrencias'
    id = db.Column(db.Integer, primary_key=True)
    instrumento_id = db.Column(db.Integer, db.ForeignKey('instrumentos.id'), nullable=True)
    maleta_id = db.Column(db.Integer, db.ForeignKey('maletas.id'), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    data_hora = db.Column(db.DateTime, default=datetime.utcnow)
    tipo = db.Column(db.String(50), nullable=True)  # dano, perda, manutencao
    status = db.Column(db.String(20), default='aberta')  # aberta, resolvida - para prática

    instrumento = db.relationship('Instrumento', backref='ocorrencias')
    maleta = db.relationship('Maleta', backref='ocorrencias')
    usuario = db.relationship('User', backref='ocorrencias')

    def __repr__(self):
        return f"<Ocorrencia {self.id} ({self.tipo})>"