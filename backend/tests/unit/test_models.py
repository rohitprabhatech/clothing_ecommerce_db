"""Unit test suite verifying all 22 SQLAlchemy declarative models, attributes, constraints, and relationships."""

from decimal import Decimal

import pytest
from sqlalchemy import inspect
from sqlalchemy.orm import configure_mappers

from app.models import (
    Advertisement,
    Base,
    Cart,
    CartItem,
    Category,
    Discount,
    Inventory,
    Order,
    OrderItem,
    Payment,
    Product,
    ProductImage,
    ProductVariant,
    Return,
    Review,
    Role,
    Shipment,
    SizeChart,
    User,
    UserAddress,
    UserRole,
    Wishlist,
    WishlistItem,
)


def test_mapper_configuration():
    """Verify that all 22 model mappers configure cleanly without relationship errors."""
    configure_mappers()
    assert len(Base.metadata.sorted_tables) == 22


def test_table_names_inventory():
    """Verify all 22 required database table names exist in Base metadata."""
    expected_tables = {
        "users",
        "roles",
        "user_roles",
        "user_addresses",
        "categories",
        "size_charts",
        "products",
        "product_variants",
        "product_images",
        "inventory",
        "carts",
        "cart_items",
        "wishlists",
        "wishlist_items",
        "discounts",
        "advertisements",
        "orders",
        "order_items",
        "payments",
        "shipments",
        "returns",
        "reviews",
    }
    actual_tables = set(Base.metadata.tables.keys())
    assert expected_tables == actual_tables


def test_user_domain_attributes():
    """Verify User and RBAC model primary keys, columns, and relationships."""
    user_mapper = inspect(User)
    assert user_mapper.primary_key[0].name == "user_id"
    user_columns = {c.key for c in user_mapper.column_attrs}
    assert {
        "user_id",
        "email",
        "password_hash",
        "first_name",
        "last_name",
        "phone_number",
        "is_active",
        "created_at",
        "updated_at",
        "deleted_at",
    }.issubset(user_columns)
    user_rels = {r.key for r in user_mapper.relationships}
    assert {"user_roles", "roles", "addresses"}.issubset(user_rels)

    role_mapper = inspect(Role)
    assert role_mapper.primary_key[0].name == "role_id"

    addr_mapper = inspect(UserAddress)
    assert addr_mapper.primary_key[0].name == "address_id"
    assert addr_mapper.columns["user_id"].foreign_keys


def test_catalog_domain_attributes():
    """Verify Category, Product, Variant, and Inventory model columns and check constraints."""
    prod_mapper = inspect(Product)
    assert prod_mapper.primary_key[0].name == "product_id"
    prod_columns = {c.key for c in prod_mapper.column_attrs}
    assert {
        "product_id",
        "category_id",
        "size_chart_id",
        "product_name",
        "slug",
        "mrp",
        "base_price",
        "gst_percentage",
        "fit_type",
        "fabric_care",
        "hsn_code",
    }.issubset(prod_columns)

    var_mapper = inspect(ProductVariant)
    assert var_mapper.primary_key[0].name == "variant_id"
    var_columns = {c.key for c in var_mapper.column_attrs}
    assert {"variant_id", "product_id", "sku", "size", "color"}.issubset(var_columns)

    inv_table = Base.metadata.tables["inventory"]
    inv_checks = [c.name for c in inv_table.constraints if hasattr(c, "sqltext")]
    assert "chk_inventory_stock_quantity" in inv_checks
    assert "chk_inventory_reserved_quantity" in inv_checks


def test_cart_and_wishlist_constraints():
    """Verify Cart, CartItem, Wishlist, and WishlistItem unique constraints."""
    cart_item_table = Base.metadata.tables["cart_items"]
    cart_uq_names = [uq.name for uq in cart_item_table.constraints if hasattr(uq, "columns")]
    assert any("cart_variant" in name for name in cart_uq_names if name)
    cart_checks = [c.name for c in cart_item_table.constraints if hasattr(c, "sqltext")]
    assert "chk_cart_items_quantity" in cart_checks

    wishlist_item_table = Base.metadata.tables["wishlist_items"]
    wl_uq_names = [uq.name for uq in wishlist_item_table.constraints if hasattr(uq, "columns")]
    assert any("wishlist_variant" in name for name in wl_uq_names if name)


def test_marketing_model_constraints():
    """Verify Discount coupon check constraints."""
    discount_table = Base.metadata.tables["discounts"]
    disc_checks = [c.name for c in discount_table.constraints if hasattr(c, "sqltext")]
    assert "chk_discounts_discount_type" in disc_checks


def test_order_domain_constraints():
    """Verify Order, OrderItem, Payment, and Return check constraints."""
    order_table = Base.metadata.tables["orders"]
    order_checks = [c.name for c in order_table.constraints if hasattr(c, "sqltext")]
    assert "chk_orders_payment_method" in order_checks
    assert "chk_orders_payment_status" in order_checks
    assert "chk_orders_order_status" in order_checks

    order_item_table = Base.metadata.tables["order_items"]
    oi_checks = [c.name for c in order_item_table.constraints if hasattr(c, "sqltext")]
    assert "chk_order_items_quantity" in oi_checks
    assert "chk_order_items_item_status" in oi_checks

    payment_table = Base.metadata.tables["payments"]
    pay_checks = [c.name for c in payment_table.constraints if hasattr(c, "sqltext")]
    assert "chk_payments_status" in pay_checks

    return_table = Base.metadata.tables["returns"]
    ret_checks = [c.name for c in return_table.constraints if hasattr(c, "sqltext")]
    assert "chk_returns_return_type" in ret_checks
    assert "chk_returns_quantity" in ret_checks
    assert "chk_returns_qc_status" in ret_checks
    assert "chk_returns_status" in ret_checks


def test_review_domain_constraints():
    """Verify Review rating range and apparel fit feedback check constraints."""
    review_table = Base.metadata.tables["reviews"]
    review_checks = [c.name for c in review_table.constraints if hasattr(c, "sqltext")]
    assert "chk_reviews_rating" in review_checks
    assert "chk_reviews_fit_feedback" in review_checks


def test_model_repr_methods():
    """Verify that model __repr__ methods evaluate cleanly without unmapped attribute errors."""
    u = User(user_id=1, email="customer@prabhatech.com", is_active=True)
    assert "<User" in repr(u)
    r = Role(role_id=1, role_name="customer")
    assert "<Role" in repr(r)
    cat = Category(category_id=1, slug="men-shirts", is_active=True)
    assert "<Category" in repr(cat)
    p = Product(product_id=1, slug="linen-shirt", base_price=Decimal("1299.00"))
    assert "<Product" in repr(p)
    d = Discount(discount_id=1, code="FESTIVE20", discount_type="PERCENTAGE", value=Decimal("20.00"))
    assert "<Discount" in repr(d)
    o = Order(order_id=1, order_number="PT-2026-00001", total_amount=Decimal("1599.00"), order_status="PENDING")
    assert "<Order" in repr(o)
    rev = Review(review_id=1, product_id=1, user_id=1, rating=5, is_approved=True)
    assert "<Review" in repr(rev)