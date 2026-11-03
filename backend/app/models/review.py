"""SQLAlchemy 2.0 declarative model for Product Reviews and Customer Feedback."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.catalog import Product
from app.models.order import OrderItem
from app.models.user import User


class Review(Base):
    """Customer product review entity with verified buyer verification and fit feedback."""

    __tablename__ = "reviews"
    __table_args__ = (
        CheckConstraint("rating >= 1 AND rating <= 5", name="chk_reviews_rating"),
        CheckConstraint(
            "fit_feedback IN ('TRUE_TO_SIZE', 'RUNS_SMALL', 'RUNS_LARGE')",
            name="chk_reviews_fit_feedback",
        ),
    )

    review_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    product_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("products.product_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("users.user_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    order_item_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("order_items.order_item_id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    fit_feedback: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )
    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    review_images_json: Mapped[list[str] | dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )
    is_approved: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("false"),
        default=False,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    product: Mapped[Product] = relationship(
        "Product",
    )
    user: Mapped[User] = relationship(
        "User",
    )
    order_item: Mapped[OrderItem | None] = relationship(
        "OrderItem",
    )

    def __repr__(self) -> str:
        return (
            f"<Review(review_id={self.review_id}, product_id={self.product_id}, "
            f"user_id={self.user_id}, rating={self.rating}, is_approved={self.is_approved})>"
        )