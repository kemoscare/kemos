from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager

from app.protocols.controllers import protocols
from app.users.controllers import users
from app.users.models import User


app = Flask(__name__)
app.static_url_path = "/"
login_manager = LoginManager()
login_manager.init_app(app)


# CORS 
CORS(app, supports_credentials=True)

# Registering blueprints
app.config.from_object('config')
app.register_blueprint(protocols)
app.register_blueprint(users)

# Login Manager

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
