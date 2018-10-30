from app.fake_passwords import FAKE_PASSWORDS
from random import randint
from passlib.apps import custom_app_context as password_context
from flask_login import UserMixin
from app.database import get_database
from bson.objectid import ObjectId
from pprint import pprint


def random_fake_password():
    max = len(FAKE_PASSWORDS) - 1
    return FAKE_PASSWORDS[randint(0, max)]

class User(UserMixin):

    # BSON or JSON deserialization, to check origin - see is_registered method
    def __init__(self, document):
        if "_id" in document:
            self._id = str(document["_id"])

        self.email = document["email"]

        if "password" in document:
            self.password = document["password"]

        self.first_name = document["first_name"]
        self.last_name = document["last_name"]
        self.rights = document["rights"]
        self.themes = document["themes"]
        
    def is_registered(self):
        return hasattr(self, "_id")

    def get_id(self):
        if hasattr(self, '_id'):
            return self._id

    @staticmethod
    def get(user_id):
        db = get_database()
        return db.users.findOne({'_id': ObjectId(user_id)})
        
    def register(self):
        if self.is_registered(): return None
        db = get_database()
        password = random_fake_password()
        pprint(password)
        self.password = password_context.hash(password)
        res = db.users.insert_one(vars(self))
        return res.inserted_id

    def is_authenticated():
        return True
    
    def check_password(self, password):
        if not self.password: return False
        return password_context.verify(password, self.password)
    