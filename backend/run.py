# run.py
from app import create_app, db, socketio

app = create_app()

# Importamos os modelos DEPOIS que o app já foi criado
from app.models.user import User, Role

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Role': Role
    }

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)