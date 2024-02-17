from http import HTTPStatus

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import Comments, CommentNotFoundError, Users, UserNotFoundError


class Comment(Resource):
    path = '/comment/<int:id>'

    def get(self, id):
        try:
            return Comments.get_by_id(id).json()
        except CommentNotFoundError:
            return {'message': 'Comment not found'}, HTTPStatus.NOT_FOUND


    # def patch(self, id):                       realize it later
    #     data = request.get_json()
    #     return Coments.patch(id, data)

    # def delete(self, id):
    #     return Coments.delete(id)


class CreateComment(Resource):
    path = '/comments/new'

    @jwt_required()
    def post(self, ):
        args = request.get_json()
        user_id = get_jwt_identity()

        try:
            user = Users.get_by_id(user_id)
        except UserNotFoundError:
            return {'message': 'Users not found'}, HTTPStatus.UNAUTHORIZED

        new_comment = Comments(
            comment=args['comment'],
            user=user.id,
            post_id=args['post_id']
        )

        return new_comment.json()