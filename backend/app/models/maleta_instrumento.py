from .. import db

maleta_instrumento = db.Table(
    'maleta_instrumento',
    db.Column('maleta_id', db.Integer, db.ForeignKey('maletas.id'), primary_key=True),
    db.Column('instrumento_id', db.Integer, db.ForeignKey('instrumentos.id'), primary_key=True),
    db.Column('quantidade_ideal', db.Integer, nullable=False, default=1)
)