from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.protocols.controllers import protocols
from app.users.controllers import users
from app.users.models import User


app = Flask(__name__)

# CORS 
CORS(app)

# Registering blueprints
app.config.from_object('config')
app.register_blueprint(protocols)
app.register_blueprint(users)

