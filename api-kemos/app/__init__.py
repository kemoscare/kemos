from flask import Flask
from flask_cors import CORS

from config import MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_CONNECTION
from app.protocols.controllers import protocols

# from app.database.clients import get_client
app = Flask(__name__)

# CORS 
CORS(app)
CORS(protocols)
app.config.from_object('config')
app.register_blueprint(protocols)
