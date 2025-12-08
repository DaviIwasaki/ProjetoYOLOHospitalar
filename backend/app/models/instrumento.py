from .. import db
from datetime import datetime
import qrcode
from io import BytesIO
from base64 import b64encode

class Instrumento(db.Model):
    __tablename__ = 'instrumentos'
    id = db.Column(db.Integer, primary_key=True)
    codigo_interno = db.Column(db.String(50), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    validade = db.Column(db.Date, nullable=True)
    quantidade_estoque = db.Column(db.Integer, default=0, nullable=False)
    estoque_minimo = db.Column(db.Integer, default=0)
    estoque_maximo = db.Column(db.Integer, default=9999)
    qr_code = db.Column(db.Text, nullable=True)  # base64 do QR
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    categoria = db.relationship('Categoria', backref='instrumentos')

    def generate_qr_code(self):
        if not self.qr_code:
            qr = qrcode.QRCode()
            qr.add_data(self.codigo_interno)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            self.qr_code = b64encode(buffered.getvalue()).decode('utf-8')

    def __repr__(self):
        return f"<Instrumento {self.nome} ({self.codigo_interno})>"