from .db import db, BaseModel
from .db_exceptions import *


class Comments(BaseModel):
    __tablename__ = 'coments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.now())

    def patch(self, data):
        for field in ['content']:
            if field in data:
                setattr(self, field, data[field])
        self.save()

    @classmethod
    def get_by_id(cls, id):
        obj = cls.query.get(id)
        if not obj:
            raise CommentNotFoundError
        return obj