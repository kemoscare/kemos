from flask import Blueprint, request, jsonify, Response
from pprint import pprint
from app import MONGODB_CONNECTION, MONGODB_DATABASE_NAME, database
from . import queries
from bson.objectid import ObjectId
from .coders import FormDecoder, FormEncoder

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
    res = FormEncoder.encode_formio(res)
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
    if '_id' in form_json:
        db.protocoles.replace_one({'_id': form_json['_id']}, form_json, True)
    else:
        db.protocoles.insert_one(form_json)
    
    return Response(status=201)
        
