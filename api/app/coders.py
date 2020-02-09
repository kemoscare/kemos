from json import JSONEncoder, JSONDecoder
from bson.objectid import ObjectId
from pprint import pprint

class FormEncoder(JSONEncoder):
    def default(self, object):
        if isinstance(object, ObjectId):
            return str(object)

    @staticmethod
    def level_up_empty_elements(elements):
        newElements = []
        for element in elements:
            not_in_element = 'value' not in element or element['value'] == None or element['value'] == ""
            childNodes_in_element = 'childNodes' in element

            if not_in_element and childNodes_in_element:
                element = [childNode for childNode in element['childNodes']] # array
                element = FormEncoder.level_up_empty_elements(element)

            elif childNodes_in_element:
                foo = FormEncoder.level_up_empty_elements(element['childNodes'])
                element['childNodes'] = foo
            else:
                element['id'] = str(element['id'])

            if isinstance(element, list): # array, unwound
                for e in element : 
                    newElements.append(e)
            else: # dict
                newElements.append(element)
            
        
        return newElements

class FormDecoder(JSONDecoder): # From forms to mongo database
    
    def __init__(self, *args, **kwargs):
        JSONDecoder.__init__(self, object_hook=self.object_hook, *args, *kwargs)

    def object_hook(self, object):
        if 'content' in object:
            object['imagery'] = object['content']['imagery']
            object['consultation'] = object['content']['consultation']
            del object['content']
        if '_id' in object:
            object['_id'] = ObjectId(object['_id'])

        return object
