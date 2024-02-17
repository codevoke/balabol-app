import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from models import db
from resources import api

app = Flask(__name__)
CORS(app)

# create jwt manager object for configuring app with jwt
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')  # PRODUCTION_DATABASE_URI
# postgresql://glebisi:9gj0vDdtsfeR@ep-steep-scene-a541pl14.us-east-2.aws.neon.tech/database?sslmode=require
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

# initialization app to database and creating superuser

with app.app_context():
    db.init_app(app)
    db.create_all()

# initialization app to api
api.init_app(app)
