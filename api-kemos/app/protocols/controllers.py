from flask import Blueprint, request, jsonify, Response
from pprint import pprint
from app import MONGODB_CONNECTION, MONGODB_DATABASE_NAME, database
from . import queries
from bson.objectid import ObjectId
from bson.json_util import dumps

protocols = Blueprint('protocols', __name__, url_prefix='/protocols')

@protocols.route('/<id>', methods=['GET'])
def get_protocol(id):
    if id == 'themes':
        return 'ok then, too old'
    db = database.get_database()
    protocol_id = ObjectId(id)
    res = db.protocoles.find_one({ "_id": protocol_id})
    res['hexId'] = protocol_id
    return dumps(res)

def workTree(elements):
    newElements = []
    for element in elements:
        not_in_element = 'value' not in element or element['value'] == None
        childNodes_in_element = 'childNodes' in element

        if not_in_element and childNodes_in_element:
            element = [childNode for childNode in element['childNodes']] # array
            element = workTree(element)

        elif childNodes_in_element:
            foo = workTree(element['childNodes'])
            element['childNodes'] = foo
        else:
            element['id'] = str(element['id'])

        if isinstance(element, list): # array, unwound
            for e in element : 
                newElements.append(e)
        else: # dict
            newElements.append(element)
        
    
    return newElements

@protocols.route('/names/')
def get_names():
    db = database.get_database()
    results = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
    response = workTree(results)
    return dumps(response)


@protocols.route('/new', methods=['POST'])
def post():
    form_json = request.get_json()
    db = database.get_database()
    if 'hexId' not in form_json:
        db.protocoles.insert_one(form_json)
    else:
        form_id = ObjectId(form_json['hexId'])
        del form_json['hexId']
        db.protocoles.find_one_and_replace({'_id': form_id}, form_json)
    
    return Response(status=201)
        
