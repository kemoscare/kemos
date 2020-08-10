from flask import Blueprint, request, jsonify
from flask_cors import CORS
from app.database import get_database
from app.coders import FormEncoder

products = Blueprint('products', __name__, url_prefix='/products')
products.json_encoder = FormEncoder
CORS(products)

@products.route('/', methods=['GET'])
def get_products():
    db = get_database()
    res = [p for p in db.products.find()]
    return jsonify(res)
