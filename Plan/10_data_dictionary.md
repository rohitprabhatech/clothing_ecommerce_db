# Data Dictionary Specification: Clothing E-Commerce Website

| Field | Details |
| :--- | :--- |
| **Document Title** | Data Dictionary & Column Specifications |
| **Document ID** | DOC-DB-003 |
| **Version** | 1.0 |
| **Status** | Draft / Pending Review |
| **Prepared By** | Senior Database Architect |
| **Review Status** | Pending Stakeholder Approval |

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website
* **Target Technology Stack:** MySQL 8.x, SQLAlchemy ORM
* **Document Purpose:** To define comprehensive field-level descriptions, data types, nullability, constraints, validation rules, and indexes for all tables established in the approved Database Schema Design.

## 2. Revision History

| Version | Date | Author | Description / Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-06-06 | Database Architect | Initial creation of the complete Data Dictionary matching the approved schema design. |

## 3. Database Overview

The relational database utilizes MySQL 8.x InnoDB storage engine with `utf8mb4` character encoding. All core operational tables maintain strict referential integrity, surrogate primary keys, and clear audit timestamps.

## 4. Table-by-Table Data Dictionary

### Table: `users`
* **Business Purpose:** Stores customer and administrative user credentials, identities, and password hashes.
* **Related Requirements:** BR-USR-01, FR-USR-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `user_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate identifier for each user. | Must be a positive integer. |
| `email` | VARCHAR | 255 | NO | None | UK, Index | Customer or admin login email address. | Must follow standard valid email format. |
| `password_hash` | VARCHAR | 255 | NO | None | None | Bcrypt hashed password string. | Never store plaintext; must be hashed. |
| `first_name` | VARCHAR | 100 | NO | None | None | User's given first name. | Alphabetic characters preferred. |
| `last_name` | VARCHAR | 100 | NO | None | None | User's family last name. | Alphabetic characters preferred. |
| `created_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP | None | Record creation timestamp. | Automatically populated. |
| `updated_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | None | Record modification timestamp. | Automatically updated on edit. |

---

### Table: `roles`
* **Business Purpose:** Defines system access roles (Customer, Store Admin, Super Admin) for RBAC enforcement.
* **Related Requirements:** BR-USR-01, FR-USR-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `role_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate role identifier. | Must be a positive integer. |
| `role_name` | VARCHAR | 50 | NO | None | UK | Name of the role (e.g., Customer, Admin). | Must match predefined system roles. |
| `description` | TEXT | None | YES | NULL | None | Detailed description of role privileges. | Optional descriptive text. |

---

### Table: `user_addresses`
* **Business Purpose:** Stores customer shipping and billing addresses for order fulfillment.
* **Related Requirements:** BR-ORD-01, FR-ORD-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `address_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate address identifier. | Must be a positive integer. |
| `user_id` | INT | UNSIGNED | NO | None | FK (`users.user_id`) | Owner of the address record. | Must reference an existing user. |
| `street_address` | VARCHAR | 255 | NO | None | None | Street number and name. | Required for shipping. |
| `city` | VARCHAR | 100 | NO | None | None | City name. | Required. |
| `state` | VARCHAR | 100 | NO | None | None | State or province name. | Required. |
| `postal_code` | VARCHAR | 20 | NO | None | None | Postal or ZIP code. | Required alphanumeric format. |
| `country` | VARCHAR | 100 | NO | None | None | Country name. | Required. |
| `is_default` | BOOLEAN | None | NO | FALSE | None | Flags default shipping address. | Only one default per user. |

---

### Table: `categories`
* **Business Purpose:** Organizes clothing into hierarchical multi-level categories (e.g., Men $\rightarrow$ Tops).
* **Related Requirements:** BR-CAT-01, FR-CAT-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `category_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate category identifier. | Must be a positive integer. |
| `parent_id` | INT | UNSIGNED | YES | NULL | FK (`categories.category_id`) | Parent category reference for subcategories. | Null if top-level category. |
| `category_name` | VARCHAR | 100 | NO | None | None | Name of the category. | Required. |
| `slug` | VARCHAR | 120 | NO | None | UK, Index | URL-friendly category slug. | Must be unique and lowercase. |
| `description` | TEXT | None | YES | NULL | None | Category description. | Optional text. |

---

### Table: `products`
* **Business Purpose:** Stores master clothing product catalog details (name, brand, base description).
* **Related Requirements:** BR-CAT-02, FR-CAT-02

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `product_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate product identifier. | Must be a positive integer. |
| `category_id` | INT | UNSIGNED | NO | None | FK (`categories.category_id`), Index | Associated category. | Must reference valid category. |
| `product_name` | VARCHAR | 150 | NO | None | None | Master title of the clothing item. | Required. |
| `brand` | VARCHAR | 100 | NO | None | None | Brand or manufacturer name. | Required. |
| `description` | TEXT | None | YES | NULL | None | Detailed product description and fabric details. | Optional descriptive text. |
| `base_price` | DECIMAL | 10,2 | NO | None | Check (`base_price > 0`) | Base retail price. | Must be greater than zero. |
| `is_active` | BOOLEAN | None | NO | TRUE | None | Product listing status. | False hides product from catalog. |

---

### Table: `product_variants`
* **Business Purpose:** Tracks specific clothing attributes (Size, Color, Material) and unique SKU bindings.
* **Related Requirements:** BR-CAT-02, FR-CAT-02

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `variant_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate variant identifier. | Must be a positive integer. |
| `product_id` | INT | UNSIGNED | NO | None | FK (`products.product_id`), Index | Master product reference. | Must reference valid product. |
| `sku` | VARCHAR | 100 | NO | None | UK, Index | Unique Stock Keeping Unit code. | Must be globally unique per variant. |
| `size` | VARCHAR | 20 | NO | None | None | Clothing size (e.g., S, M, L, XL). | Required size attribute. |
| `color` | VARCHAR | 50 | NO | None | None | Clothing color (e.g., Black, Navy Blue). | Required color attribute. |
| `material` | VARCHAR | 100 | YES | NULL | None | Fabric material composition. | Optional attribute. |
| `price_override` | DECIMAL | 10,2 | YES | NULL | Check (`price_override > 0`) | Optional variant-specific price override. | If null, uses base product price. |

---

### Table: `product_images`
* **Business Purpose:** Stores image asset URLs and display ordering for products and variants.
* **Related Requirements:** BR-CAT-02

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `image_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate image identifier. | Must be a positive integer. |
| `product_id` | INT | UNSIGNED | NO | None | FK (`products.product_id`), Index | Associated product reference. | Must reference valid product. |
| `image_url` | VARCHAR | 500 | NO | None | None | Fully qualified image asset URL. | Valid URL format required. |
| `display_order` | INT | UNSIGNED | NO | 0 | None | Sequence order for image rendering. | Non-negative integer. |
| `is_primary` | BOOLEAN | None | NO | FALSE | None | Flags primary thumbnail image. | Only one primary image per product. |

---

### Table: `inventory`
* **Business Purpose:** Manages real-time stock levels bound strictly to product variant SKUs.
* **Related Requirements:** BR-CAT-02, FR-CAT-02

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `inventory_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate inventory identifier. | Must be a positive integer. |
| `variant_id` | INT | UNSIGNED | NO | None | FK (`product_variants.variant_id`), UK, Index | Specific variant SKU reference. | One-to-one mapping with variant. |
| `stock_quantity` | INT | UNSIGNED | NO | 0 | Check (`stock_quantity >= 0`) | Current physical stock count available. | Cannot be negative. |
| `low_stock_threshold` | INT | UNSIGNED | NO | 5 | None | Alert threshold for low inventory. | Non-negative integer. |
| `updated_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | None | Last inventory adjustment timestamp. | Automatically updated on change. |

---

### Table: `carts`
* **Business Purpose:** Manages active customer shopping cart sessions.
* **Related Requirements:** BR-CRT-01, FR-CRT-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cart_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate cart identifier. | Must be a positive integer. |
| `user_id` | INT | UNSIGNED | NO | None | FK (`users.user_id`), UK, Index | Associated registered customer. | One active cart per user. |
| `created_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP | None | Cart session creation timestamp. | Automatically populated. |
| `updated_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | None | Last cart modification timestamp. | Automatically updated on item add/remove. |

---

### Table: `cart_items`
* **Business Purpose:** Captures line items within active shopping carts.
* **Related Requirements:** BR-CRT-01, FR-CRT-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cart_item_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate cart item identifier. | Must be a positive integer. |
| `cart_id` | INT | UNSIGNED | NO | None | FK (`carts.cart_id`), Index | Parent shopping cart reference. | Must reference valid cart. |
| `variant_id` | INT | UNSIGNED | NO | None | FK (`product_variants.variant_id`), Index | Specific clothing variant added. | Must reference valid variant SKU. |
| `quantity` | INT | UNSIGNED | NO | 1 | Check (`quantity > 0`) | Quantity of variant selected. | Must be greater than zero. |

---

### Table: `wishlists`
* **Business Purpose:** Stores saved items for registered customers for future purchase.
* **Related Requirements:** BR-CRT-01, FR-CRT-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `wishlist_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate wishlist identifier. | Must be a positive integer. |
| `user_id` | INT | UNSIGNED | NO | None | FK (`users.user_id`), UK, Index | Associated registered customer. | One wishlist container per user. |
| `created_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP | None | Wishlist creation timestamp. | Automatically populated. |

---

### Table: `wishlist_items`
* **Business Purpose:** Line items associated with customer wishlists.
* **Related Requirements:** BR-CRT-01, FR-CRT-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `wishlist_item_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate wishlist item identifier. | Must be a positive integer. |
| `wishlist_id` | INT | UNSIGNED | NO | None | FK (`wishlists.wishlist_id`), Index | Parent wishlist reference. | Must reference valid wishlist. |
| `variant_id` | INT | UNSIGNED | NO | None | FK (`product_variants.variant_id`), Index | Saved clothing variant reference. | Must reference valid variant SKU. |
| `added_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP | None | Timestamp when item was saved. | Automatically populated. |

---

### Table: `orders`
* **Business Purpose:** Records completed checkout transactions, order totals, and fulfillment status.
* **Related Requirements:** BR-ORD-01, FR-ORD-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `order_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate order identifier. | Must be a positive integer. |
| `user_id` | INT | UNSIGNED | NO | None | FK (`users.user_id`), Index | Customer who placed the order. | Must reference valid user. |
| `address_id` | INT | UNSIGNED | NO | None | FK (`user_addresses.address_id`) | Shipping address snapshot reference. | Must reference valid address. |
| `total_amount` | DECIMAL | 10,2 | NO | None | Check (`total_amount > 0`) | Total transaction amount. | Must be greater than zero. |
| `order_status` | VARCHAR | 50 | NO | 'Placed' | None | Current fulfillment status. | Allowed: Placed, Processing, Shipped, Delivered, Cancelled. |
| `created_at` | TIMESTAMP | None | NO | CURRENT_TIMESTAMP | Index | Order placement timestamp. | Automatically populated. |

---

### Table: `order_items`
* **Business Purpose:** Captures permanent line-item snapshots (variant SKU, unit price, quantity) for each order.
* **Related Requirements:** BR-ORD-01, FR-ORD-01

| Column Name | Data Type | Length / Precision | Nullable | Default Value | Key / Constraint | Description | Validation / Business Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `order_item_id` | INT | UNSIGNED | NO | AUTO_INCREMENT | PK | Unique surrogate order item identifier. | Must be a positive integer. |
| `order_id` | INT | UNSIGNED | NO | None | FK (`orders.order_id`), Index | Parent order reference. | Must reference valid order. |
| `variant_id` | INT | UNSIGNED | NO | None | FK (`product_variants.variant_id`), Index | Purchased clothing variant reference. | Must reference valid variant SKU. |
| `quantity` | INT | UNSIGNED | NO | None | Check (`quantity > 0`) | Quantity purchased. | Must be greater than zero. |
| `unit_price` | DECIMAL | 10,2 | NO | None | Check (`unit_price > 0`) | Locked unit price snapshot at purchase time. | Preserves historical pricing. |

## 5. Data Validation Rules

* **Email Format:** Validated at both FastAPI Pydantic schema level and MySQL unique key constraints.
* **Pricing & Quantities:** Enforced via MySQL `CHECK` constraints ensuring prices and stock quantities remain strictly non-negative.
* **SKU Uniqueness:** Unique index constraint on `product_variants.sku` prevents duplicate SKU creation.

## 6. Naming Conventions

* **Tables:** Plural snake_case nomenclature (e.g., `users`, `products`, `orders`).
* **Primary Keys:** Singular table name suffixed with `_id` (e.g., `user_id`, `product_id`).
* **Foreign Keys:** Explicit naming matching the referenced primary key column (e.g., `user_id`, `category_id`).
* **Timestamps:** Standardized audit columns (`created_at`, `updated_at`).

## 7. Data Integrity Rules

* **Referential Integrity:** Foreign keys are enforced at the InnoDB storage engine level.
* **Cascade Rules:** Deleting parent records (e.g., products) cascades to child assets (e.g., images, variants), whereas deleting users with historical orders is restricted (`RESTRICT`) to preserve financial audits.

## 8. Pending Decisions

* **PTD-02:** Confirmation of database connection pooling and asynchronous driver optimizations.

## 9. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature |
| :--- | :--- | :--- | :--- | :--- |
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — |
| *[Pending]* | Senior Database Architect | **Pending Review** | — | — |
