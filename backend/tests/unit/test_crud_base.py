from collections.abc import Generator
import pytest
from sqlalchemy import Integer, String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker, Session
from app.core.exceptions import NotFoundException
from app.repositories.base import BaseRepository
from app.services.base import BaseService


class OrmBase(DeclarativeBase):
    pass


class SampleEntity(OrmBase):
    __tablename__ = "sample_entities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)


@pytest.fixture
def in_memory_db() -> Generator[Session, None, None]:
    engine = create_engine("sqlite:///:memory:")
    OrmBase.metadata.create_all(bind=engine)
    session_factory = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    session = session_factory()
    try:
        yield session
    finally:
        session.close()
        engine.dispose()


def test_base_repository_and_service(in_memory_db: Session) -> None:
    repo = BaseRepository[SampleEntity](SampleEntity, in_memory_db)
    service = BaseService[SampleEntity, BaseRepository[SampleEntity]](repo)

    # Test Create
    created = repo.create({"name": "Test Shirt"})
    assert created.id is not None
    assert created.name == "Test Shirt"

    # Test Get by ID
    found = service.get_by_id(created.id)
    assert found.name == "Test Shirt"

    # Test Get Optional
    assert service.get_optional(999) is None

    # Test List Multi
    items = service.list_all()
    assert len(items) == 1

    # Test Update
    updated = repo.update(created, {"name": "Updated Shirt"})
    assert updated.name == "Updated Shirt"

    # Test Delete
    service.delete(created.id)
    with pytest.raises(NotFoundException):
        service.get_by_id(created.id)
