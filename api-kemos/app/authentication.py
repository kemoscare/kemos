from flask import g, abort
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as JSONSerializer
from app.users.models import User
from app.database import get_database
from passlib.apps import custom_app_context as password_context
from config import SECRET_KEY

http_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth('Bearer')

@http_auth.verify_password
def verify_password(email, password):
    db = get_database()
    try:
        user = User(db.users.find_one({'email': email}))
        if not user or not user.check_password(password):
            return False
        else:
            g.user = user
            return True
    except TypeError:
        return False

@token_auth.verify_token
def verify_token(token):
    user = User.verify_token(token)
    if not user:
        return False
    else:
        g.user = user
        return True

def needs_permissions(user, permission):
    if not permission in user.rights:
        abort(403)