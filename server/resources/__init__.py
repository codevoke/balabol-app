from flask_restful import Api

from .user import User, Register, UserPosts
from .post import Post, CreatePost
from .comment import Comment, CreateComment
from .auth import Auth


api = Api(prefix='/api')

for resource in [User, Auth, Register, CreatePost, Post, CreateComment, Comment, UserPosts]:
    api.add_resource(resource, resource.path)
