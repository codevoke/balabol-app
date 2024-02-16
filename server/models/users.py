from .db import db, BaseModel
from .db_exceptions import *
from passlib.hash import pbkdf2_sha256


class Users(BaseModel):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def patch(self, data):
        for field in ['name', 'username', 'email']:
            if field in data:
                setattr(self, field, data[field])
        if 'password' in data:
            self.password = pbkdf2_sha256.hash(data['password'])
        self.save()

    @classmethod
    def auth(cls, username, password):
        user = cls.query.filter_by(username=username).first()

        if not user:
            raise UserNotFoundError
        
        if not pbkdf2_sha256.verify(password, user.password):
            raise IncorrectPassword
        
        return user
    
    @classmethod
    def get_by_id(cls, id):
        obj = cls.query.get(id)
        if not obj:
            raise UserNotFoundError
        return obj