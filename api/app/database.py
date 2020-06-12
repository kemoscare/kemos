from pymongo import MongoClient
from config import MONGODB_CONNECTION, MONGODB_DATABASE_NAME


_MONGO_CLIENT = None

def get_client(connection_string=MONGODB_CONNECTION):
    if(_MONGO_CLIENT == None):
        return MongoClient(connection_string)
    else:
        return _MONGO_CLIENT

def get_database(connection_string=MONGODB_CONNECTION, database_name=MONGODB_DATABASE_NAME):
    return get_client(connection_string).get_database(database_name)