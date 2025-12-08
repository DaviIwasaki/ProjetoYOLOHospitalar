from .. import db
from datetime import datetime

class Maleta(db.Model):
    __tablename__ = 'maletas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    codigo_maleta = db.Column(db.String(50), unique=True, nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    instrumentos = db.relationship('Instrumento', secondary='maleta_instrumento', backref='maletas')

    def __repr__(self):
        return f"<Maleta {self.nome} ({self.codigo_maleta})>"