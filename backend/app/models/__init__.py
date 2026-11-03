"""Database models package."""

from app.models.base import Base, IDMixin, TimestampMixin
from app.models.catalog import (
    Category,
    Inventory,
    Product,
    ProductImage,
    ProductVariant,
    SizeChart,
)
from app.models.user import Role, User, UserAddress, UserRole
from app.models.cart import Cart, CartItem, Wishlist, WishlistItem
from app.models.marketing import Advertisement, Discount
from app.models.order import Order, OrderItem, Payment, Return, Shipment
from app.models.review import Review

__all__ = [
    "Base",
    "IDMixin",
    "TimestampMixin",
    # User domain
    "User",
    "Role",
    "UserRole",
    "UserAddress",
    # Catalog domain
    "Category",
    "SizeChart",
    "Product",
    "ProductVariant",
    "ProductImage",
    "Inventory",
    # Cart Domain
    "Cart",
    "CartItem",
    "Wishlist",
    "WishlistItem",
    # Marketing domain
    "Discount",
    "Advertisement",
    # Order domain
    "Order",
    "OrderItem",
    "Payment",
    "Shipment",
    "Return",
    # Review Domain
    "Review",
]