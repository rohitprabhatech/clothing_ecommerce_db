"""SQLAlchemy 2.0 declarative models for Orders, Order Items, Payments, Shipments, and Returns."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any

from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin
from app.models.catalog import ProductVariant
from app.models.marketing import Discount
from app.models.user import User, UserAddress


class Order(Base, TimestampMixin):
    """Customer order header entity matching `orders` table."""

    __tablename__ = "orders"
    __table_args__ = (
        Index("idx_orders_user", "user_id"),
        Index("idx_orders_number", "order_number"),
        CheckConstraint(
            "payment_method IN ('PREPAID', 'COD')",
            name="chk_orders_payment_method",
        ),
        CheckConstraint(
            "payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')",
            name="chk_orders_payment_status",
        ),
        CheckConstraint(
            "order_status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')",
            name="chk_orders_order_status",
        ),
    )

    order_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
        index=True,
    )
    order_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )
    user_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("users.user_id", ondelete="RESTRICT"),
        nullable=False,
    )
    address_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("user_addresses.address_id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    shipping_address_snapshot: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
    )
    billing_address_snapshot: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )
    discount_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("discounts.discount_id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    subtotal_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    discount_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=False,
    )
    shipping_fee: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=False,
    )
    tax_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=False,
    )
    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    payment_method: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    payment_status: Mapped[str] = mapped_column(
        String(30),
        server_default=text("'PENDING'"),
        default="PENDING",
        nullable=False,
    )
    order_status: Mapped[str] = mapped_column(
        String(30),
        server_default=text("'PENDING'"),
        default="PENDING",
        nullable=False,
    )

    # Relationships
    user: Mapped[User] = relationship("User")
    address: Mapped[UserAddress | None] = relationship("UserAddress")
    discount: Mapped[Discount | None] = relationship("Discount")
    items: Mapped[list[OrderItem]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    payments: Mapped[list[Payment]] = relationship(
        "Payment",
        back_populates="order",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    shipments: Mapped[list[Shipment]] = relationship(
        "Shipment",
        back_populates="order",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    returns: Mapped[list[Return]] = relationship(
        "Return",
        back_populates="order",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return (
            f"<Order(order_id={self.order_id}, order_number='{self.order_number}', "
            f"total_amount={self.total_amount}, status='{self.order_status}')>"
        )


class OrderItem(Base):
    """Specific line item purchased within an order matching `order_items` table."""

    __tablename__ = "order_items"
    __table_args__ = (
        Index("idx_order_items_order", "order_id"),
        CheckConstraint("quantity > 0", name="chk_order_items_quantity"),
        CheckConstraint(
            "item_status IN ('CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURN_REQUESTED', 'RETURNED', 'EXCHANGED')",
            name="chk_order_items_item_status",
        ),
    )

    order_item_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    order_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("orders.order_id", ondelete="CASCADE"),
        nullable=False,
    )
    variant_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    product_name_snapshot: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    sku_snapshot: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    mrp: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    discount_share: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=False,
    )
    tax_percentage: Mapped[Decimal] = mapped_column(
        Numeric(5, 2),
        nullable=False,
    )
    tax_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    net_total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    item_status: Mapped[str] = mapped_column(
        String(30),
        server_default=text("'CONFIRMED'"),
        default="CONFIRMED",
        nullable=False,
    )

    # Relationships
    order: Mapped[Order] = relationship("Order", back_populates="items")
    variant: Mapped[ProductVariant] = relationship("ProductVariant")
    returns: Mapped[list[Return]] = relationship("Return", back_populates="order_item")

    def __repr__(self) -> str:
        return (
            f"<OrderItem(order_item_id={self.order_item_id}, order_id={self.order_id}, "
            f"sku='{self.sku_snapshot}', net_total={self.net_total})>"
        )


class Payment(Base, TimestampMixin):
    """Payment transaction entity matching `payments` table."""

    __tablename__ = "payments"
    __table_args__ = (
        CheckConstraint(
            "status IN ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED')",
            name="chk_payments_status",
        ),
    )

    payment_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    order_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("orders.order_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    payment_gateway: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )
    transaction_ref: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )
    amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )
    gateway_response: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    # Relationships
    order: Mapped[Order] = relationship("Order", back_populates="payments")

    def __repr__(self) -> str:
        return (
            f"<Payment(payment_id={self.payment_id}, order_id={self.order_id}, "
            f"gateway='{self.payment_gateway}', amount={self.amount}, status='{self.status}')>"
        )


class Shipment(Base, TimestampMixin):
    """Logistics dispatch and delivery entity matching `shipments` table."""

    __tablename__ = "shipments"

    shipment_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    order_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("orders.order_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    shipping_aggregator: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )
    courier_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    tracking_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    tracking_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    status: Mapped[str] = mapped_column(
        String(50),
        server_default=text("'MANIFESTED'"),
        default="MANIFESTED",
        nullable=False,
    )
    shipped_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    delivered_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # Relationships
    order: Mapped[Order] = relationship("Order", back_populates="shipments")

    def __repr__(self) -> str:
        return (
            f"<Shipment(shipment_id={self.shipment_id}, order_id={self.order_id}, "
            f"tracking_number='{self.tracking_number}', status='{self.status}')>"
        )


class Return(Base, TimestampMixin):
    """Garment item-level return or size exchange entity matching `returns` table."""

    __tablename__ = "returns"
    __table_args__ = (
        CheckConstraint(
            "return_type IN ('REFUND', 'EXCHANGE')",
            name="chk_returns_return_type",
        ),
        CheckConstraint(
            "return_quantity > 0",
            name="chk_returns_quantity",
        ),
        CheckConstraint(
            "qc_status IN ('PENDING', 'PASSED', 'FAILED')",
            name="chk_returns_qc_status",
        ),
        CheckConstraint(
            "status IN ('REQUESTED', 'APPROVED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'COMPLETED', 'REJECTED')",
            name="chk_returns_status",
        ),
    )

    return_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    order_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("orders.order_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    order_item_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("order_items.order_item_id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    return_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    exchange_variant_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="SET NULL"),
        nullable=True,
    )
    return_quantity: Mapped[int] = mapped_column(
        Integer,
        server_default=text("1"),
        default=1,
        nullable=False,
    )
    reason: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    customer_comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    qc_status: Mapped[str] = mapped_column(
        String(30),
        server_default=text("'PENDING'"),
        default="PENDING",
        nullable=False,
    )
    status: Mapped[str] = mapped_column(
        String(30),
        server_default=text("'REQUESTED'"),
        default="REQUESTED",
        nullable=False,
    )
    refund_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        server_default=text("0.00"),
        default=Decimal("0.00"),
        nullable=False,
    )
    reverse_tracking_number: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    # Relationships
    order: Mapped[Order] = relationship("Order", back_populates="returns")
    order_item: Mapped[OrderItem] = relationship("OrderItem", back_populates="returns")
    exchange_variant: Mapped[ProductVariant | None] = relationship("ProductVariant")

    def __repr__(self) -> str:
        return (
            f"<Return(return_id={self.return_id}, order_id={self.order_id}, "
            f"order_item_id={self.order_item_id}, type='{self.return_type}', status='{self.status}')>"
        )