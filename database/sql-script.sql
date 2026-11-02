-- ==============================================================================
-- Project Name: Clothing E-Commerce Website
-- Database Engine: MySQL 8.0+ (InnoDB Storage Engine)
-- Character Set & Collation: utf8mb4, utf8mb4_unicode_ci
-- Description: Part 1 - Database creation, configuration, and strict SQL mode.
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS clothing_ecommerce_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE clothing_ecommerce_db;

-- Ensure strict SQL mode for transactional and data integrity
SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ============================================================================
-- PRABHA TECHNOLOGY - CLOTHING E-COMMERCE PRODUCTION DATABASE SCHEMA (PostgreSQL)
-- ============================================================================

-- 1. USERS, ROLES & AUTHENTICATION
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone_number VARCHAR(20) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'customer', 'admin', 'warehouse_manager'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE user_addresses (
    address_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    recipient_name VARCHAR(150) NOT NULL,
    street_address TEXT NOT NULL,
    apartment_suite VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    phone_number VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES, SIZE CHARTS & PRODUCTS
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    category_name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- NEW: Size Charts for Apparel (Can be linked per category or product)
CREATE TABLE size_charts (
    size_chart_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
    chart_name VARCHAR(100) NOT NULL, -- e.g., 'Men Regular Fit Shirts', 'Women Kurtis'
    measurements_json JSONB NOT NULL, -- e.g., [{"size": "M", "chest_in": 40, "length_in": 28, "shoulder_in": 17.5}]
    measurement_guide_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id) ON DELETE RESTRICT,
    size_chart_id INT REFERENCES size_charts(size_chart_id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    brand VARCHAR(100),
    description TEXT,
    fit_type VARCHAR(50),          -- NEW: e.g., 'Slim Fit', 'Regular Fit', 'Oversized'
    fabric_care VARCHAR(255),      -- NEW: e.g., '100% Cotton, Machine Wash Cold'
    hsn_code VARCHAR(20),          -- NEW: Indian GST HSN code (e.g., '6205' for men's shirts)
    gst_percentage NUMERIC(5,2) DEFAULT 5.00, -- NEW: Default GST % (5% or 12%)
    mrp NUMERIC(10, 2) NOT NULL,   -- NEW: Maximum Retail Price (Strike-through price)
    base_price NUMERIC(10, 2) NOT NULL, -- Selling Price before coupon
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
    variant_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    size VARCHAR(20) NOT NULL,     -- e.g., 'S', 'M', 'L', 'XL', '32', '34'
    color VARCHAR(50) NOT NULL,    -- e.g., 'Navy Blue', 'Olive Green'
    color_hex VARCHAR(10),         -- NEW: Hex code for UI color swatch (e.g., '#000080')
    material VARCHAR(100),
    mrp_override NUMERIC(10, 2),   -- NEW: Optional override if XXL has higher MRP
    price_override NUMERIC(10, 2), -- Optional selling price override
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
    image_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(variant_id) ON DELETE SET NULL, -- UPGRADED: Link image to specific color/variant
    color VARCHAR(50), -- Optional tag so all sizes of 'Navy Blue' share the same image set
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    inventory_id BIGSERIAL PRIMARY KEY,
    variant_id BIGINT UNIQUE NOT NULL REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    reserved_quantity INT NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0), -- NEW: Prevents overselling during checkout
    low_stock_threshold INT DEFAULT 5,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. SHOPPING CART & WISHLIST (SUPPORTS GUEST CHECKOUT)
CREATE TABLE carts (
    cart_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, -- Nullable for Guest Users
    session_id VARCHAR(120), -- NEW: Tracks guest cart via cookie/UUID before login
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    cart_item_id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES carts(cart_id) ON DELETE CASCADE,
    variant_id BIGINT NOT NULL REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (cart_id, variant_id)
);

CREATE TABLE wishlists (
    wishlist_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_items (
    wishlist_item_id BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(wishlist_id) ON DELETE CASCADE,
    variant_id BIGINT NOT NULL REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (wishlist_id, variant_id)
);

-- 4. MARKETING: DISCOUNTS & ADVERTISEMENTS
CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
    value NUMERIC(10, 2) NOT NULL,
    min_order_amount NUMERIC(10, 2) DEFAULT 0.00,
    max_discount_amount NUMERIC(10, 2), -- NEW: Caps % discounts (e.g. 20% off up to Rs 500)
    expiry_date TIMESTAMPTZ,
    usage_limit INT,
    per_user_limit INT DEFAULT 1,       -- NEW: Prevents same user abusing code
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE advertisements (
    banner_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    placement VARCHAR(50) DEFAULT 'HOME_HERO', -- NEW: 'HOME_HERO', 'CATEGORY_TOP', 'PROMO_STRIP'
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDERS, ITEMS, PAYMENTS, SHIPMENTS & ITEM-LEVEL RETURNS
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL, -- NEW: Human-readable e.g., 'PT-2026-00001'
    user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    address_id BIGINT REFERENCES user_addresses(address_id) ON DELETE SET NULL,
    shipping_address_snapshot JSONB NOT NULL, -- NEW: Immutable copy of address at checkout time
    billing_address_snapshot JSONB,           -- NEW: Immutable copy of billing address
    discount_id INT REFERENCES discounts(discount_id) ON DELETE SET NULL, -- FIXED: Linked to discounts
    subtotal_amount NUMERIC(10, 2) NOT NULL,  -- NEW: Sum of item selling prices before coupon/shipping
    discount_amount NUMERIC(10, 2) DEFAULT 0.00, -- NEW: Coupon discount applied
    shipping_fee NUMERIC(10, 2) DEFAULT 0.00,
    tax_amount NUMERIC(10, 2) DEFAULT 0.00,   -- Total GST amount
    total_amount NUMERIC(10, 2) NOT NULL,     -- Final payable: subtotal - discount + tax + shipping
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('PREPAID', 'COD')), -- NEW
    payment_status VARCHAR(30) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED')), -- NEW
    order_status VARCHAR(30) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_item_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    variant_id BIGINT NOT NULL REFERENCES product_variants(variant_id) ON DELETE RESTRICT,
    product_name_snapshot VARCHAR(255) NOT NULL, -- NEW: Snapshot in case product is renamed
    sku_snapshot VARCHAR(100) NOT NULL,          -- NEW: Snapshot of SKU
    quantity INT NOT NULL CHECK (quantity > 0),
    mrp NUMERIC(10, 2) NOT NULL,                 -- NEW: Original MRP at purchase
    unit_price NUMERIC(10, 2) NOT NULL,          -- Selling price per unit
    discount_share NUMERIC(10, 2) DEFAULT 0.00,  -- NEW: Prorated coupon discount for this item (crucial for single-item refunds)
    tax_percentage NUMERIC(5, 2) NOT NULL,       -- NEW: GST slab applied (e.g., 5% or 12%)
    tax_amount NUMERIC(10, 2) NOT NULL,          -- NEW: Exact GST calculated on this item
    net_total NUMERIC(10, 2) NOT NULL,           -- NEW: Final paid amount for this line item
    item_status VARCHAR(30) DEFAULT 'CONFIRMED' CHECK (item_status IN ('CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURN_REQUESTED', 'RETURNED', 'EXCHANGED'))
);

CREATE TABLE payments (
    payment_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    payment_gateway VARCHAR(50) NOT NULL, -- e.g., 'Razorpay', 'Cashfree', 'PhonePe', 'COD'
    transaction_ref VARCHAR(150),
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL CHECK (status IN ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED')),
    gateway_response JSONB, -- Upgraded to JSONB to store Razorpay/Stripe webhook payload
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipments (
    shipment_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    shipping_aggregator VARCHAR(50), -- NEW: e.g., 'Shiprocket', 'Delhivery', 'BlueDart'
    courier_name VARCHAR(100),
    tracking_number VARCHAR(100),    -- AWB Number
    tracking_url TEXT,               -- NEW: Direct tracking link for customer
    status VARCHAR(50) DEFAULT 'MANIFESTED',
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- UPGRADED: Supports item-level returns & size exchanges (Crucial for Clothing!)
CREATE TABLE returns (
    return_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    order_item_id BIGINT NOT NULL REFERENCES order_items(order_item_id) ON DELETE RESTRICT, -- Links to specific garment!
    return_type VARCHAR(20) NOT NULL CHECK (return_type IN ('REFUND', 'EXCHANGE')),
    exchange_variant_id BIGINT REFERENCES product_variants(variant_id), -- Populated if customer wants a different size (e.g., M -> L)
    return_quantity INT NOT NULL DEFAULT 1 CHECK (return_quantity > 0),
    reason VARCHAR(255) NOT NULL, -- e.g., 'SIZE_TOO_SMALL', 'SIZE_TOO_LARGE', 'DEFECTIVE', 'COLOR_MISMATCH'
    customer_comments TEXT,
    qc_status VARCHAR(30) DEFAULT 'PENDING' CHECK (qc_status IN ('PENDING', 'PASSED', 'FAILED')), -- Quality check upon warehouse receipt
    status VARCHAR(30) DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'APPROVED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'COMPLETED', 'REJECTED')),
    refund_amount NUMERIC(10, 2) DEFAULT 0.00,
    reverse_tracking_number VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. PRODUCT REVIEWS (WITH VERIFIED PURCHASE & CUSTOMER PHOTOS)
CREATE TABLE reviews (
    review_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    order_item_id BIGINT REFERENCES order_items(order_item_id) ON DELETE SET NULL, -- NEW: Proves verified buyer
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    fit_feedback VARCHAR(30) CHECK (fit_feedback IN ('TRUE_TO_SIZE', 'RUNS_SMALL', 'RUNS_LARGE')), -- NEW: Apparel fit feedback
    comment TEXT,
    review_images_json JSONB, -- NEW: Array of image URLs uploaded by customer
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ESSENTIAL PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX idx_products_category ON products(category_id) WHERE is_active = TRUE;
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_color_size ON product_variants(color, size);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_carts_session ON carts(session_id);



SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;