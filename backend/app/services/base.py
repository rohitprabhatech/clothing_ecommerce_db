from typing import Any, Generic, Optional, Sequence, TypeVar
from app.core.exceptions import NotFoundException
from app.models.base import Base
from app.repositories.base import BaseRepository

ModelType = TypeVar("ModelType", bound=Base)
RepoType = TypeVar("RepoType", bound=BaseRepository)


class BaseService(Generic[ModelType, RepoType]):
    """Generic Base Service coordinating business logic and data access."""

    def __init__(self, repository: RepoType) -> None:
        self.repository = repository

    def get_by_id(self, id: Any) -> ModelType:
        """Fetch entity by ID or raise NotFoundException."""
        entity = self.repository.get(id)
        if not entity:
            raise NotFoundException(message=f"Entity with ID {id} was not found.")
        return entity

    def get_optional(self, id: Any) -> Optional[ModelType]:
        """Fetch entity by ID without throwing exception if missing."""
        return self.repository.get(id)

    def list_all(self, skip: int = 0, limit: int = 100) -> Sequence[ModelType]:
        """Retrieve paginated list of entities."""
        return self.repository.get_multi(skip=skip, limit=limit)

    def delete(self, id: Any) -> ModelType:
        """Delete entity by ID or raise NotFoundException."""
        entity = self.get_by_id(id)
        self.repository.delete(id)
        return entity

