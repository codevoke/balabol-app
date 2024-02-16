from http import HTTPStatus

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import Users, UserNotFoundError


class User(Resource):
    path = '/user/<int:id>'

    def get(self, id):
        print("get user: id{}".format(id))
        try:
            return Users.get_by_id(id).json()
        except UserNotFoundError:
            return {'message': 'User not found'}
        

    # def patch(self, id):                       realize it later
    #     data = request.get_json()
    #     return Users.patch(id, data)

    # def delete(self, id):
    #     return Users.delete(id)


class Register(Resource):
    path = '/register'

    def post(self):
        args = request.get_json()
        new_user = Users(
            name=args['name'],
            username=args['username'],
            email=args['email'],
            password=args['password']
        )

        return new_user.json()