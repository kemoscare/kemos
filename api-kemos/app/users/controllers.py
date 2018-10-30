from flask import request, Blueprint, jsonify, redirect, url_for, abort, Response, make_response, g
from flask_login import login_user
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from app.coders import FormDecoder, FormEncoder
from .models import User
from app.database import get_database
from pprint import pprint
from app.authentication import token_auth, http_auth

users = Blueprint('users', __name__, url_prefix="/users")
users.json_decoder = FormDecoder
users.json_encoder = FormEncoder

CORS(users, supports_credentials=True)

@users.route("/add", methods=['POST'])
def add_user():
    user_json = request.get_json()
    user = User(user_json)
    pprint(user)
    last_inserted_id = user.register()
    return redirect(url_for('users.get_user', id=last_inserted_id))

@users.route("/")
@token_auth.login_required
def current_user():
    user = User.sanitize(g.user)
    return jsonify(user)

@users.route('/token', methods=['POST'])
@http_auth.login_required
def get_token():
    user = g.user
    token = user.generate_auth_token()
    return jsonify({'token': token.decode('utf-8')})


