"""SQLAlchemy 2.0 repositories for User accounts, RBAC roles, and customer addresses."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Optional, Sequence

from sqlalchemy import select, update
from sqlalchemy.orm import Session, selectinload

from app.models.user import Role, User, UserAddress, UserRole
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Repository handling database operations for the User entity."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=User, db=db)

    def get_by_email(self, email: str) -> Optional[User]:
        """Fetch active user by unique email address (case-insensitive)."""
        stmt = select(User).where(User.email == email.lower().strip())
        return self.db.scalars(stmt).first()

    def get_by_phone(self, phone_number: str) -> Optional[User]:
        """Fetch user by unique phone number."""
        stmt = select(User).where(User.phone_number == phone_number.strip())
        return self.db.scalars(stmt).first()

    def get_with_roles_and_addresses(self, user_id: int) -> Optional[User]:
        """Fetch user with eager-loaded roles and addresses (prevents N+1 queries)."""
        stmt = (
            select(User)
            .options(selectinload(User.roles), selectinload(User.addresses))
            .where(User.user_id == user_id)
        )
        return self.db.scalars(stmt).first()

    def get_role_by_name(self, role_name: str) -> Optional[Role]:
        """Fetch role entity by role name (e.g., 'customer', 'admin')."""
        stmt = select(Role).where(Role.role_name == role_name)
        return self.db.scalars(stmt).first()

    def assign_role(self, user_id: int, role_id: int) -> UserRole:
        """Assign a role to a user via the user_roles junction table."""
        user_role = UserRole(user_id=user_id, role_id=role_id)
        self.db.add(user_role)
        self.db.commit()
        return user_role

    def update_password(self, user: User, hashed_password: str) -> User:
        """Update a user's password hash and commit."""
        user.password_hash = hashed_password
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def soft_delete(self, user: User) -> User:
        """Soft delete a user account by setting is_active=False and deleted_at timestamp."""
        user.is_active = False
        user.deleted_at = datetime.now(timezone.utc)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user


class UserAddressRepository(BaseRepository[UserAddress]):
    """Repository handling database operations for User Addresses."""

    def __init__(self, db: Session) -> None:
        super().__init__(model=UserAddress, db=db)

    def get_user_addresses(self, user_id: int) -> Sequence[UserAddress]:
        """Fetch all delivery addresses for a given user, defaults first."""
        stmt = (
            select(UserAddress)
            .where(UserAddress.user_id == user_id)
            .order_by(UserAddress.is_default.desc(), UserAddress.created_at.desc())
        )
        return self.db.scalars(stmt).all()

    def get_user_address(self, address_id: int, user_id: int) -> Optional[UserAddress]:
        """Fetch a specific address belonging to a user (enforces user isolation)."""
        stmt = select(UserAddress).where(
            UserAddress.address_id == address_id,
            UserAddress.user_id == user_id,
        )
        return self.db.scalars(stmt).first()

    def reset_default_addresses(self, user_id: int) -> None:
        """Reset is_default to False for all addresses belonging to a user."""
        stmt = (
            update(UserAddress)
            .where(UserAddress.user_id == user_id)
            .values(is_default=False)
        )
        self.db.execute(stmt)
        self.db.commit()