"""SQLAlchemy 2.0 declarative models for Users, Roles, and Addresses."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import (BigInteger,Boolean,DateTime,ForeignKey,Integer,String,Text,func,text,)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin


class User(Base, TimestampMixin):
    """User account entity matching PostgreSQL `users` table."""

    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(BigInteger,primary_key=True,autoincrement=True,index=True,)
    email: Mapped[str] = mapped_column(String(255),unique=True,nullable=False,index=True,)
    password_hash: Mapped[str] = mapped_column(String(255),nullable=False,)
    first_name: Mapped[str] = mapped_column(String(100),nullable=False,)
    last_name: Mapped[str | None] = mapped_column(String(100),nullable=True,)
    phone_number: Mapped[str | None] = mapped_column(String(20),unique=True,nullable=True,)
    is_active: Mapped[bool] = mapped_column(Boolean,server_default=text("true"),default=True,nullable=False,)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True),nullable=True,)

    # Relationships
    user_roles: Mapped[list[UserRole]] = relationship(
        "UserRole",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    roles: Mapped[list[Role]] = relationship(
        "Role",
        secondary="user_roles",
        back_populates="users",
        viewonly=True,
    )
    addresses: Mapped[list[UserAddress]] = relationship(
        "UserAddress",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<User(user_id={self.user_id}, email='{self.email}', is_active={self.is_active})>"


class Role(Base, TimestampMixin):
    """Role-based access control entity matching PostgreSQL `roles` table."""

    __tablename__ = "roles"

    role_id: Mapped[int] = mapped_column(Integer,primary_key=True,autoincrement=True,)
    role_name: Mapped[str] = mapped_column(String(50),unique=True,nullable=False,)
    description: Mapped[str | None] = mapped_column(Text,nullable=True,)

    # Relationships
    user_roles: Mapped[list[UserRole]] = relationship(
        "UserRole",
        back_populates="role",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    users: Mapped[list[User]] = relationship(
        "User",
        secondary="user_roles",
        back_populates="roles",
        viewonly=True,
    )

    def __repr__(self) -> str:
        return f"<Role(role_id={self.role_id}, role_name='{self.role_name}')>"


class UserRole(Base):
    """Many-to-many junction model linking users to roles matching `user_roles` table."""

    __tablename__ = "user_roles"

    user_id: Mapped[int] = mapped_column(BigInteger,ForeignKey("users.user_id", ondelete="CASCADE"),primary_key=True,)
    role_id: Mapped[int] = mapped_column(Integer,ForeignKey("roles.role_id", ondelete="CASCADE"),primary_key=True,)
    assigned_at: Mapped[datetime] = mapped_column(DateTime(timezone=True),server_default=func.now(),nullable=False,)

    # Relationships
    user: Mapped[User] = relationship(
        "User",
        back_populates="user_roles",
    )
    role: Mapped[Role] = relationship(
        "Role",
        back_populates="user_roles",
    )

    def __repr__(self) -> str:
        return f"<UserRole(user_id={self.user_id}, role_id={self.role_id})>"


class UserAddress(Base, TimestampMixin):
    """Customer shipping/billing address entity matching `user_addresses` table."""

    __tablename__ = "user_addresses"

    address_id: Mapped[int] = mapped_column(BigInteger,primary_key=True,autoincrement=True,)
    user_id: Mapped[int] = mapped_column(BigInteger,ForeignKey("users.user_id", ondelete="CASCADE"),nullable=False,index=True,)
    recipient_name: Mapped[str] = mapped_column(String(150),nullable=False,)
    street_address: Mapped[str] = mapped_column(Text,nullable=False,)
    apartment_suite: Mapped[str | None] = mapped_column(String(100),nullable=True,)
    city: Mapped[str] = mapped_column(String(100),nullable=False,)
    state: Mapped[str] = mapped_column(String(100),nullable=False,)
    postal_code: Mapped[str] = mapped_column(String(20),nullable=False,)
    country: Mapped[str] = mapped_column(String(100),server_default="India",default="India",nullable=False,)
    phone_number: Mapped[str] = mapped_column(String(20),nullable=False,)
    is_default: Mapped[bool] = mapped_column(Boolean,server_default=text("false"),default=False,nullable=False,)

    # Relationships
    user: Mapped[User] = relationship(
        "User",
        back_populates="addresses",
    )

    def __repr__(self) -> str:
        return (
            f"<UserAddress(address_id={self.address_id}, "
            f"user_id={self.user_id}, city='{self.city}', is_default={self.is_default})>"
        )