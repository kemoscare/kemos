from app.database import get_database
from flask import Blueprint
from flask_cors import CORS
from flask import jsonify
from app.coders import FormEncoder, FormDecoder
from json import dumps

hospitals = Blueprint('hospitals', __name__, url_prefix='/hospitals')
hospitals.json_encoder = FormEncoder
hospitals.jsondecoder = FormDecoder
CORS(hospitals)


@hospitals.route("/")
def get_hospitals():
    db = get_database()
    hospitals = [h for h in db.hospitals.find({
        '$or': [
            { "rs" : { '$ne': ''}},
            { 'complrs': {  '$ne': ''}}
        ]
    })]
    return jsonify(hospitals)