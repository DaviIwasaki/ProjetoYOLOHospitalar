from .. import db
from datetime import datetime

class MaletaInstancia(db.Model):
    __tablename__ = 'maleta_instancias'
    id = db.Column(db.Integer, primary_key=True)
    maleta_id = db.Column(db.Integer, db.ForeignKey('maletas.id'), nullable=False)
    status = db.Column(db.String(50), default='montada')
    montada_em = db.Column(db.DateTime, default=datetime.utcnow)
    ultima_validacao = db.Column(db.DateTime)
    notas = db.Column(db.Text)

    maleta = db.relationship('Maleta', backref='instancias')