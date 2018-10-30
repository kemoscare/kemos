from app.database import get_database
from app.users.models import User
from passlib.apps import custom_app_context as custom_app_context
import sys

DEFAULT_USERS = {
    "adrien":
    {
        "email" : "adriencanterot@outlook.com",
        "first_name" : "Adrien",
        "last_name" : "Canterot",
        "rights" : [
            "admin",
            "add-protocol",
            "edit-protocol",
            "use-app"
        ],
        "themes" : [
            "urologie",
            "general",
            "immunotherapie",
            "neurologie",
            "gynecologie",
            "orl",
            "poumon",
            "systeme digestif"
        ]
    },
    "guillaume":
    {
        "email" : "guillaume.le-bihan@chu-bordeaux.fr",
        "first_name" : "Guillaume",
        "last_name" : "Le Bihan",
        "rights" : [
            "add-protocol",
            "edit-protocol",
            "use-app"
        ],
        "themes" : [
            "urologie",
            "general",
            "immunotherapie",
            "neurologie",
            "gynecologie",
            "orl",
            "poumon",
            "systeme digestif"
        ]
    }
}

def create_user(default_users):
    for user_key in default_users:
        user_document = DEFAULT_USERS[user_key]
        user = User(user_document)
        user.register()


create_user(sys.argv[1:])
