_GROUP_ORGANS_AND_THEMES = {
    '$group': {
        '_id': {
            'organ': '$organ',
            'theme': '$theme'
        },
        'childNodes': {
            '$push': {
                'category': 'protocol', 
                'parent': '$theme',
                'value': '$name', 
                'label': '$name', 
                'id': '$_id',
                'depth': 2,
                
            }
        }
    }
}

_PROJECT_ORGANS_AND_THEMES = {
    '$project': { 
        '_id': 0,
        'theme': '$_id.theme',
        'organ.category': 'organ',
        'organ.value': '$_id.organ',
        'organ.label': '$_id.organ',
        'organ.parent': '$_id.theme',
        'organ.childNodes': '$childNodes',
    }
}

_PUSH_ORGANS_TO_THEME = {
    '$group': {
        '_id': '$theme',
        'childNodes': {
            '$push': '$organ'
        }
    }
}

_FINAL_PROJECT_ORDERING = {
    '$project': { 
        '_id': 0, 
        'category': 'theme', 
        'value': '$_id', 
        'label': '$_id', 
        'id': '$_id',
        'childNodes': '$childNodes',
    }
}

GET_TREE = [_GROUP_ORGANS_AND_THEMES, 
             _PROJECT_ORGANS_AND_THEMES, 
             _PUSH_ORGANS_TO_THEME, 
             _FINAL_PROJECT_ORDERING]