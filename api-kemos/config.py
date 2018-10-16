# Statement for enabling the development environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

# Application threads. A common general assumption is
# using 2 per available processor cores - to handle
# incoming requests using one and performing background
# operations using the other.
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

MONGODB_HOST = "mongodb://localhost/"
MONGODB_DATABASE_NAME = "biglazy"
MONGODB_CONNECTION = MONGODB_HOST + MONGODB_DATABASE_NAME

# Use a secure, unique and absolutely secret key for
# signing the data. 
CSRF_SESSION_KEY = "OAIJDjoasi038iadjn92382&(*n2o8nd2i38"

# Secret key for signing cookies
SECRET_KEY = "secret"