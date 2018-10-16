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

tree = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
pprint(workTree(tree))

db = get_database()

tree = [e for e in db.protocoles.aggregate(queries.GET_TREE)]
pprint(workTree(tree))