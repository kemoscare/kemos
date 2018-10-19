from flask import Blueprint, request, jsonify, Response, redirect, url_for
from pprint import pprint
from app import MONGODB_CONNECTION, MONGODB_DATABASE_NAME, database
from . import queries
from bson.objectid import ObjectId
from .coders import FormDecoder, FormEncoder
from pymongo import ReturnDocument

protocols = Blueprint('protocols', __name__, url_prefix='/protocols')
protocols.json_encoder = FormEncoder
protocols.json_decoder = FormDecoder

@protocols.route('/<id>', methods=['GET'])
def get_protocol(id):
    if id == 'themes':
        return 'API Does not support "theme" requests anymore'
    db = database.get_database()
    protocol_id = ObjectId(id)
    res = db.protocoles.find_one({ "_id": protocol_id})
    return jsonify(res)

@protocols.route('/names/')
def get_names():
    db = database.get_database()
    results = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
    response = FormEncoder.level_up_empty_elements(results)
    return jsonify(response)


@protocols.route('/new', methods=['POST'])
def post():
    form_json = request.get_json()
    db = database.get_database()
    object_id = 0
    if '_id' in form_json:
        document = db.protocoles.find_one_and_replace({'_id': form_json['_id']}, form_json, return_document=ReturnDocument.AFTER)
        object_id = str(document['_id'])
    else:
        res = db.protocoles.insert_one(form_json)
        object_id = str(res.inserted_id)

    return redirect(url_for('protocols.get_protocol', id=object_id))
        
