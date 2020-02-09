from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from flask_mail import Mail
from app.protocols.controllers import protocols
from app.users.controllers import users
from app.hospitals.controllers import hospitals

app = Flask(__name__)
app.config.from_object('config')
mail_instance = Mail(app)
# CORS 
CORS(app)

# Registering blueprints

app.register_blueprint(protocols)
app.register_blueprint(users)
app.register_blueprint(hospitals)

