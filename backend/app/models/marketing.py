"""SQLAlchemy 2.0 declarative models for Discounts and Promotional Advertisements."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    Integer,
    Numeric,
    String,
    Text,
    func,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Discount(Base):
    """Marketing promotional discount coupon entity matching `discounts` table."""

    __tablename__ = "discounts"
    __table_args__ = (
        CheckConstraint(
            "discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')",
            name="chk_discounts_discount_type",
        ),
    )

    discount_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )
    code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )
    discount_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    value: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    min_order_amount: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=True,
    )
    max_discount_amount: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )
    expiry_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    usage_limit: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )
    per_user_limit: Mapped[int | None] = mapped_column(
        Integer,
        server_default=text("1"),
        default=1,
        nullable=True,
    )
    times_used: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
        default=0,
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return (
            f"<Discount(discount_id={self.discount_id}, code='{self.code}', "
            f"discount_type='{self.discount_type}', value={self.value})>"
        )


class Advertisement(Base):
    """Marketing promotional banner / advertisement matching `advertisements` table."""

    __tablename__ = "advertisements"

    banner_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )
    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )
    image_url: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    link_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    placement: Mapped[str] = mapped_column(
        String(50),
        server_default="HOME_HERO",
        default="HOME_HERO",
        nullable=False,
    )
    display_order: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
        default=0,
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )
    start_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    end_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<Advertisement(banner_id={self.banner_id}, title='{self.title}', placement='{self.placement}')>"