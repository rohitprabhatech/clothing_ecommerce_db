"""SQLAlchemy 2.0 declarative models for Carts, Cart Items, Wishlists, and Wishlist Items."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    UniqueConstraint,
    func,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin
from app.models.catalog import ProductVariant
from app.models.user import User


class Cart(Base, TimestampMixin):
    """Shopping cart entity supporting both guest sessions and logged-in users."""

    __tablename__ = "carts"
    __table_args__ = (
        Index("idx_carts_session", "session_id"),
    )

    cart_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
        index=True,
    )
    user_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("users.user_id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    session_id: Mapped[str | None] = mapped_column(
        String(120),
        nullable=True,
    )

    # Relationships
    user: Mapped[User | None] = relationship(
        "User",
    )
    items: Mapped[list[CartItem]] = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<Cart(cart_id={self.cart_id}, user_id={self.user_id}, session_id='{self.session_id}')>"


class CartItem(Base, TimestampMixin):
    """Specific garment SKU line item within a cart."""

    __tablename__ = "cart_items"
    __table_args__ = (
        UniqueConstraint("cart_id", "variant_id", name="uq_cart_items_cart_variant"),
        CheckConstraint("quantity > 0", name="chk_cart_items_quantity"),
    )

    cart_item_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    cart_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("carts.cart_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    variant_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    quantity: Mapped[int] = mapped_column(
        Integer,
        server_default=text("1"),
        default=1,
        nullable=False,
    )

    # Relationships
    cart: Mapped[Cart] = relationship(
        "Cart",
        back_populates="items",
    )
    variant: Mapped[ProductVariant] = relationship(
        "ProductVariant",
    )

    def __repr__(self) -> str:
        return (
            f"<CartItem(cart_item_id={self.cart_item_id}, "
            f"cart_id={self.cart_id}, variant_id={self.variant_id}, quantity={self.quantity})>"
        )


class Wishlist(Base):
    """User wishlist entity matching `wishlists` table."""

    __tablename__ = "wishlists"

    wishlist_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("users.user_id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    user: Mapped[User] = relationship(
        "User",
    )
    items: Mapped[list[WishlistItem]] = relationship(
        "WishlistItem",
        back_populates="wishlist",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<Wishlist(wishlist_id={self.wishlist_id}, user_id={self.user_id})>"


class WishlistItem(Base):
    """Specific garment SKU saved in a user's wishlist."""

    __tablename__ = "wishlist_items"
    __table_args__ = (
        UniqueConstraint("wishlist_id", "variant_id", name="uq_wishlist_items_wishlist_variant"),
    )

    wishlist_item_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    wishlist_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("wishlists.wishlist_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    variant_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    added_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    wishlist: Mapped[Wishlist] = relationship(
        "Wishlist",
        back_populates="items",
    )
    variant: Mapped[ProductVariant] = relationship(
        "ProductVariant",
    )

    def __repr__(self) -> str:
        return (
            f"<WishlistItem(wishlist_item_id={self.wishlist_item_id}, "
            f"wishlist_id={self.wishlist_id}, variant_id={self.variant_id})>"
        )