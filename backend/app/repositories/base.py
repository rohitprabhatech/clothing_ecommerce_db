from typing import Any, Generic, Optional, Sequence, Type, TypeVar
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Generic Base Repository providing foundational CRUD operations using SQLAlchemy 2.0."""

    def __init__(self, model: Type[ModelType], db: Session) -> None:
        self.model = model
        self.db = db

    def get(self, id: Any) -> Optional[ModelType]:
        """Fetch a single record by primary key."""
        return self.db.get(self.model, id)

    def get_multi(
        self,
        skip: int = 0,
        limit: int = 100,
    ) -> Sequence[ModelType]:
        """Fetch multiple records with offset and limit."""
        statement = select(self.model).offset(skip).limit(limit)
        return self.db.scalars(statement).all()

    def create(self, obj_in: dict[str, Any] | ModelType) -> ModelType:
        """Create and persist a new record."""
        if isinstance(obj_in, dict):
            db_obj = self.model(**obj_in)
        else:
            db_obj = obj_in
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db_obj: ModelType,
        obj_in: dict[str, Any],
    ) -> ModelType:
        """Update an existing record."""
        for field, value in obj_in.items():
            if hasattr(db_obj, field):
                setattr(db_obj, field, value)
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def delete(self, id: Any) -> Optional[ModelType]:
        """Remove a record by primary key."""
        obj = self.get(id)
        if obj:
            self.db.delete(obj)
            self.db.commit()
        return obj

