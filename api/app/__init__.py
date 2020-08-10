from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from flask_mail import Mail
from app.protocols.controllers import protocols
from app.users.controllers import users
from app.hospitals.controllers import hospitals
from app.products.controllers import products
import logging

app = Flask(__name__)
app.config.from_object('config')
mail_instance = Mail(app)
# CORS 
CORS(app)

# Registering blueprints
logging.getLogger('flask_cors').level = logging.DEBUG
app.register_blueprint(protocols)
app.register_blueprint(users)
app.register_blueprint(hospitals)
app.register_blueprint(products)
