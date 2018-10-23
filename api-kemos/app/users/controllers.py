from app import database
from flask import Flask, request, Blueprint, Response, jsonify, redirect, url_for
from pprint import pprint
from bson.objectid import ObjectId
from app.coders import FormDecoder, FormEncoder

users = Blueprint('users', __name__, url_prefix="/users")
users.json_decoder = FormDecoder
users.json_encoder = FormEncoder

@users.route("/add", methods=['POST'])
def add_user():
    db = database.get_database()
    user = request.get_json()
    res = db.users.insert_one(user)
    return redirect(url_for('users.get_user', id=res.inserted_id))

@users.route("/<id>")
def get_user(id):
    db = database.get_database()
    user = db.users.find_one({'_id': ObjectId(id)})
    return jsonify(user)
