from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class BaseModel(db.Model):
    __abstract__ = True
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.save()

    def _get_fields(self):
        return [f for f in dir(self) if not f.startswith('_') and not callable(getattr(self, f))]
    
    def json(self):
        return {f: str(getattr(self, f)) for f in self._get_fields()}
    
    def save(self):
        db.session.add(self)
        db.session.commit()
