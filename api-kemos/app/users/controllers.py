from flask import request, Blueprint, jsonify, redirect, url_for, abort, Response, make_response
from flask_login import login_user
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from app.coders import FormDecoder, FormEncoder
from .models import User
from app.database import get_database
from pprint import pprint



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

@users.route("/<id>")
def get_user(id):
    db = get_database()
    user = db.users.find_one({'_id': ObjectId(id)})
    return jsonify(user)

@users.route("/login", methods=['POST'])
def login():
    db = get_database()
    credentials = request.get_json()
    try: 
        user = User(db.users.find_one({'email': credentials["email"]}))
        if not user or not user.check_password(credentials["password"]):
            abort(401)        
        else:
            login_user(user)
            return jsonify({'flash': 'aosiaosijdoaisdj'})
    except TypeError:
        abort(401)



