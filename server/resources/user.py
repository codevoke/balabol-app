from http import HTTPStatus

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256

from models import Users, UserNotFoundError, Posts, PostNotFoundError


class User(Resource):
    path = '/user/<int:id>'

    def get(self, id):
        print("get user: id{}".format(id))
        try:
            return Users.get_by_id(id).json()
        except UserNotFoundError:
            return {'message': 'User not found'}, HTTPStatus.NOT_FOUND
        

    # def patch(self, id):                       realize it later
    #     data = request.get_json()
    #     return Users.patch(id, data)

    # def delete(self, id):
    #     return Users.delete(id)


class UserPosts(Resource):
    path = "/user-posts/<int:user_id>"

    def get(self, user_id):
        try:
            posts = Posts.get_by_user_id(user_id)
        except PostNotFoundError:
            return {"message": "posts not found"}, HTTPStatus.NOT_FOUND
        return {"posts": [p.json() for p in posts]}, HTTPStatus.OK


class Register(Resource):
    path = '/register'

    def post(self):
        args = request.get_json()
        new_user = Users(
            name     = args['name'],
            username = args['username'],
            email    = args['email'],
            password = pbkdf2_sha256.hash(args['password'])
        )

        return new_user.json()