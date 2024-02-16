from http import HTTPStatus

from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from models import Users, UserNotFoundError, IncorrectPassword


class Auth(Resource):
    path = '/auth'

    def post(self):
        args = request.get_json()

        try:
            user = Users.auth(args['username'], args['password'])

        except UserNotFoundError:
            return {'message': 'User not found'}, HTTPStatus.NOT_FOUND
        except IncorrectPassword:
            return {'message': 'Incorrect password'}, HTTPStatus.UNAUTHORIZED

        return {'token': create_access_token(identity=user.id), "user": user.json()}