from app.protocols import queries
from app.database import get_database
from pprint import pprint

from app.protocols import queries
from app.database import get_database
from pprint import pprint

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

        if isinstance(element, list):
            newElements.append(element[0])
        else:
            newElements.append(element)
        
    
    return newElements

db = get_database()

# tree = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
# pprint(workTree(tree))

# db = get_database()

# tree = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
# pprint(workTree(tree))

from app.protocols.models import Protocol
import json
from app.protocols.coders import FormEncoder, FormDecoder
from bson.objectid import ObjectId
from flask import jsonify
# form_protocol_json = open('form_protocol.json', 'r')
# mongo_protocol = json.load(form_protocol_json, cls=FormDecoder)

# pprint(mongo_protocol)

document = [e for e in db.protocoles.find({'_id': ObjectId('5bb0e04bcf4fb86664d63f2e')})][0]
document = FormEncoder.encode_formio(document)
# print(document)
print(json.dumps(document, cls=FormEncoder))

# pprint(json.dumps())
# form_protocol = json.load(open('mongo_protocol.json', 'r'), cls=FormDecoder)

# pprint(form_protocol)

