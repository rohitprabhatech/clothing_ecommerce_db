"""SQLAlchemy 2.0 declarative models for Categories, Size Charts, Products, Variants, Images, and Inventory."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any

from sqlalchemy import (
    BigInteger,
    Boolean,
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


class Category(Base, TimestampMixin):
    """Product hierarchical category model matching `categories` table."""

    __tablename__ = "categories"

    category_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )
    parent_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("categories.category_id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    category_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    slug: Mapped[str] = mapped_column(
        String(120),
        unique=True,
        nullable=False,
        index=True,
    )
    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )

    # Self-referential hierarchy
    parent: Mapped[Category | None] = relationship(
        "Category",
        remote_side=[category_id],
        back_populates="subcategories",
    )
    subcategories: Mapped[list[Category]] = relationship(
        "Category",
        back_populates="parent",
    )

    # Relationships
    size_charts: Mapped[list[SizeChart]] = relationship(
        "SizeChart",
        back_populates="category",
    )
    products: Mapped[list[Product]] = relationship(
        "Product",
        back_populates="category",
    )

    def __repr__(self) -> str:
        return f"<Category(category_id={self.category_id}, slug='{self.slug}', is_active={self.is_active})>"


class SizeChart(Base, TimestampMixin):
    """Apparel size chart model matching `size_charts` table."""

    __tablename__ = "size_charts"

    size_chart_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )
    category_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("categories.category_id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    chart_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    measurements_json: Mapped[dict[str, Any] | list[Any]] = mapped_column(
        JSONB,
        nullable=False,
    )
    measurement_guide_image_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # Relationships
    category: Mapped[Category | None] = relationship(
        "Category",
        back_populates="size_charts",
    )
    products: Mapped[list[Product]] = relationship(
        "Product",
        back_populates="size_chart",
    )

    def __repr__(self) -> str:
        return f"<SizeChart(size_chart_id={self.size_chart_id}, chart_name='{self.chart_name}')>"


class Product(Base, TimestampMixin):
    """Master apparel product model matching `products` table."""

    __tablename__ = "products"
    __table_args__ = (
        Index(
            "idx_products_category",
            "category_id",
            postgresql_where=text("is_active = TRUE"),
        ),
    )

    product_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
        index=True,
    )
    category_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("categories.category_id", ondelete="RESTRICT"),
        nullable=True,
    )
    size_chart_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("size_charts.size_chart_id", ondelete="SET NULL"),
        nullable=True,
    )
    product_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    slug: Mapped[str] = mapped_column(
        String(280),
        unique=True,
        nullable=False,
        index=True,
    )
    brand: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )
    fit_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )
    fabric_care: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )
    hsn_code: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )
    gst_percentage: Mapped[Decimal | None] = mapped_column(
        Numeric(5, 2),
        server_default=text("5.00"),
        default=Decimal("5.00"),
        nullable=True,
    )
    mrp: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    base_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )

    # Relationships
    category: Mapped[Category | None] = relationship(
        "Category",
        back_populates="products",
    )
    size_chart: Mapped[SizeChart | None] = relationship(
        "SizeChart",
        back_populates="products",
    )
    variants: Mapped[list[ProductVariant]] = relationship(
        "ProductVariant",
        back_populates="product",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    images: Mapped[list[ProductImage]] = relationship(
        "ProductImage",
        back_populates="product",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<Product(product_id={self.product_id}, slug='{self.slug}', base_price={self.base_price})>"


class ProductVariant(Base, TimestampMixin):
    """Specific SKU/size/color garment variant matching `product_variants` table."""

    __tablename__ = "product_variants"
    __table_args__ = (
        Index("idx_variants_color_size", "color", "size"),
    )

    variant_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
        index=True,
    )
    product_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("products.product_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    sku: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )
    size: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    color: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )
    color_hex: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )
    material: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    mrp_override: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )
    price_override: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        server_default=text("true"),
        default=True,
        nullable=False,
    )

    # Relationships
    product: Mapped[Product] = relationship(
        "Product",
        back_populates="variants",
    )
    inventory: Mapped[Inventory | None] = relationship(
        "Inventory",
        back_populates="variant",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    images: Mapped[list[ProductImage]] = relationship(
        "ProductImage",
        back_populates="variant",
    )

    def __repr__(self) -> str:
        return f"<ProductVariant(variant_id={self.variant_id}, sku='{self.sku}', size='{self.size}', color='{self.color}')>"


class ProductImage(Base):
    """Garment image gallery entity matching `product_images` table."""

    __tablename__ = "product_images"

    image_id: Mapped[int] = mapped_column(
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
    variant_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="SET NULL"),
        nullable=True,
    )
    color: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )
    image_url: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    display_order: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
        default=0,
        nullable=False,
    )
    is_primary: Mapped[bool] = mapped_column(
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
        back_populates="images",
    )
    variant: Mapped[ProductVariant | None] = relationship(
        "ProductVariant",
        back_populates="images",
    )

    def __repr__(self) -> str:
        return f"<ProductImage(image_id={self.image_id}, product_id={self.product_id}, is_primary={self.is_primary})>"


class Inventory(Base):
    """Live inventory entity matching `inventory` table."""

    __tablename__ = "inventory"
    __table_args__ = (
        CheckConstraint("stock_quantity >= 0", name="chk_inventory_stock_quantity"),
        CheckConstraint("reserved_quantity >= 0", name="chk_inventory_reserved_quantity"),
    )

    inventory_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
    variant_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("product_variants.variant_id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )
    stock_quantity: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
        default=0,
        nullable=False,
    )
    reserved_quantity: Mapped[int] = mapped_column(
        Integer,
        server_default=text("0"),
        default=0,
        nullable=False,
    )
    low_stock_threshold: Mapped[int | None] = mapped_column(
        Integer,
        server_default=text("5"),
        default=5,
        nullable=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    variant: Mapped[ProductVariant] = relationship(
        "ProductVariant",
        back_populates="inventory",
    )

    def __repr__(self) -> str:
        return (
            f"<Inventory(inventory_id={self.inventory_id}, "
            f"variant_id={self.variant_id}, stock_quantity={self.stock_quantity})>"
        )