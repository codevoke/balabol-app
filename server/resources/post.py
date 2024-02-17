from http import HTTPStatus

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import Posts, PostNotFoundError, Users, UserNotFoundError


class Post(Resource):
    path = '/post/<int:id>'

    def get(self, id):
        try:
            return Posts.get_by_id(id).json()
        except PostNotFoundError:
            return {'message': 'Post not found'}, HTTPStatus.NOT_FOUND
    

    # def patch(self, id):                       realize it later
    #     data = request.get_json()
    #     return Posts.patch(id, data)

    # def delete(self, id):
    #     return Posts.delete(id)
        

class CreatePost(Resource):
    path = '/post/new'

    @jwt_required()
    def post(self, ):
        args = request.get_json()
        user_id = get_jwt_identity()

        try:
            user = Users.get_by_id(user_id)
        except UserNotFoundError:
            return {'message': 'User not found'}, HTTPStatus.UNAUTHORIZED

        new_post = Posts(
            title=args['title'],
            content=args['content'],
            user_id=user.id
        )

        return new_post.json()