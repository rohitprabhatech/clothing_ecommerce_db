# Database Schema Design: Clothing E-Commerce Website

| Field | Details |
| :--- | :--- |
| **Document Title** | Database Schema Design & Architecture Specification |
| **Document ID** | DOC-DB-002 |
| **Version** | 1.0 |
| **Status** | Draft / Pending Review |
| **Prepared By** | Senior Database Architect & MySQL Database Designer |
| **Review Status** | Pending Stakeholder Approval |

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website
* **Target Technology Stack:** MySQL 8.x (Relational Database Engine), SQLAlchemy (ORM)
* **Document Purpose:** To define the logical database schema design, table inventories, entity relationships, constraints, and data integrity rules based strictly on approved project requirements and database analysis.

## 2. Revision History

| Version | Date | Author | Description / Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-06-06 | Database Architect | Initial draft of the database schema design specification. |

## 3. Database Design Principles

* **Normalization:** All core operational tables are structured to Third Normal Form (3NF) to eliminate data redundancy and ensure transactional integrity.
* **ACID Compliance:** Utilizing MySQL's InnoDB storage engine to guarantee transactional atomicity, consistency, isolation, and durability (crucial for order processing and inventory decrements).
* **ORM Compatibility:** Designing schemas optimized for SQLAlchemy declarative mapping, foreign key definitions, and relationship management.
* **Separation of Concerns:** Strict segregation between core required transactional tables, optional feature tables, and deferred future enhancement tables.

## 4. Complete Table Inventory & Analysis

Following a thorough review of approved requirements (`BR-XXX`, `FR-XXX`) and the database requirements analysis, entities have been filtered to remove duplicate functionality and ensure every proposed table serves an indispensable business purpose.

### Required Tables (Core Initial Release)

| Table Name | Business Purpose | Primary Key | Important Columns | Related Tables | Requirement Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `users` | Stores user credentials, email identities, password hashes, and profile metadata. | `user_id` (INT, PK) | `email`, `password_hash`, `first_name`, `last_name`, `created_at` | `roles`, `user_addresses`, `carts`, `orders`, `wishlists` | BR-USR-01, FR-USR-01 |
| `roles` | Defines system access roles (Customer, Store Admin, Super Admin) for RBAC enforcement. | `role_id` (INT, PK) | `role_name`, `description` | `users` (via mapping/join) | BR-USR-01, FR-USR-01 |
| `user_addresses` | Stores customer shipping and billing addresses for order fulfillment. | `address_id` (INT, PK) | `user_id`, `street_address`, `city`, `state`, `postal_code`, `country`, `is_default` | `users`, `orders` | BR-ORD-01, FR-ORD-01 |
| `categories` | Organizes clothing into hierarchical multi-level categories (e.g., Men $\rightarrow$ Tops). | `category_id` (INT, PK) | `parent_id`, `category_name`, `slug`, `description` | `categories` (self-referencing), `products` | BR-CAT-01, FR-CAT-01 |
| `products` | Stores master clothing product catalog details (name, brand, base description). | `product_id` (INT, PK) | `category_id`, `product_name`, `brand`, `description`, `base_price`, `is_active` | `categories`, `product_variants`, `product_images` | BR-CAT-02, FR-CAT-02 |
| `product_variants` | Tracks specific clothing attributes (Size, Color, Material) and unique SKU bindings. | `variant_id` (INT, PK) | `product_id`, `sku`, `size`, `color`, `material`, `price_override` | `products`, `inventory`, `cart_items`, `order_items` | BR-CAT-02, FR-CAT-02 |
| `product_images` | Stores image asset URLs and display ordering for products and variants. | `image_id` (INT, PK) | `product_id`, `image_url`, `display_order`, `is_primary` | `products` | BR-CAT-02 |
| `inventory` | Manages real-time stock levels bound strictly to product variant SKUs. | `inventory_id` (INT, PK) | `variant_id`, `stock_quantity`, `low_stock_threshold`, `updated_at` | `product_variants` | BR-CAT-02, FR-CAT-02 |
| `carts` | Manages active customer shopping cart sessions. | `cart_id` (INT, PK) | `user_id`, `created_at`, `updated_at` | `users`, `cart_items` | BR-CRT-01, FR-CRT-01 |
| `cart_items` | Captures line items within active shopping carts. | `cart_item_id` (INT, PK) | `cart_id`, `variant_id`, `quantity` | `carts`, `product_variants` | BR-CRT-01, FR-CRT-01 |
| `wishlists` | Stores saved items for registered customers for future purchase. | `wishlist_id` (INT, PK) | `user_id`, `created_at` | `users`, `wishlist_items` | BR-CRT-01, FR-CRT-01 |
| `wishlist_items` | Line items associated with customer wishlists. | `wishlist_item_id` (INT, PK) | `wishlist_id`, `variant_id`, `added_at` | `wishlists`, `product_variants` | BR-CRT-01, FR-CRT-01 |
| `orders` | Records completed checkout transactions, order totals, and fulfillment status. | `order_id` (INT, PK) | `user_id`, `address_id`, `total_amount`, `order_status`, `created_at` | `users`, `user_addresses`, `order_items` | BR-ORD-01, FR-ORD-01 |
| `order_items` | Captures permanent line-item snapshots (variant SKU, unit price, quantity) for each order. | `order_item_id` (INT, PK) | `order_id`, `variant_id`, `quantity`, `unit_price` | `orders`, `product_variants` | BR-ORD-01, FR-ORD-01 |

### Optional Tables (Deferred Pending Business Decisions)

| Table Name | Business Purpose | Primary Key | Important Columns | Related Tables | Requirement Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `payments` | Tracks payment gateway transactions and status updates. | `payment_id` (INT, PK) | `order_id`, `payment_gateway`, `transaction_ref`, `amount`, `status` | `orders` | PBD-03 |
| `shipments` | Tracks courier details, tracking numbers, and delivery milestones. | `shipment_id` (INT, PK) | `order_id`, `courier_name`, `tracking_number`, `status` | `orders` | BR-ORD-01 |
| `returns` | Manages apparel return requests, inspection status, and refunds. | `return_id` (INT, PK) | `order_id`, `reason`, `status`, `refund_amount` | `orders` | PBD-05 |

### Future Enhancement Tables (Excluded from Initial Release)

| Table Name | Business Purpose | Primary Key | Important Columns | Related Tables | Requirement Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `discounts` / `coupons` | Manages promotional discount codes and promotional pricing rules. | `discount_id` (INT, PK) | `code`, `discount_type`, `value`, `expiry_date` | `orders` (optional) | Unconfirmed |
| `advertisements` | Manages promotional banners and marketing displays. | `banner_id` (INT, PK) | `title`, `image_url`, `link_url`, `display_order` | Independent | Unconfirmed |
| `reviews` | Stores customer star ratings and text feedback on clothing items. | `review_id` (INT, PK) | `product_id`, `user_id`, `rating`, `comment`, `is_approved` | `products`, `users` | Unconfirmed |

## 5. Table Design Summary

All tables utilize InnoDB storage engine defaults with `utf8mb4` character sets to support international character handling and emojis. Primary keys are configured as auto-incrementing integers (`INT UNSIGNED AUTO_INCREMENT`), providing optimal indexing performance for relational joins.

## 6. Entity Relationships

| Parent Table | Child Table | Relationship Type | Foreign Key | Business Reason |
| :--- | :--- | :--- | :--- | :--- |
| `users` | `user_addresses` | One-to-Many | `user_id` | A customer can maintain multiple shipping and billing addresses. |
| `users` | `carts` | One-to-One / One-to-Many | `user_id` | Links an active shopping cart session to a registered user. |
| `users` | `wishlists` | One-to-One | `user_id` | Links a saved wishlist container to a registered user. |
| `users` | `orders` | One-to-Many | `user_id` | Associates completed purchase transactions with the customer account. |
| `user_addresses` | `orders` | One-to-Many | `address_id` | Preserves the specific shipping address snapshot used for order fulfillment. |
| `categories` | `categories` | Self-Referencing | `parent_id` | Enables multi-level category hierarchies (Parent category $\rightarrow$ Subcategory). |
| `categories` | `products` | One-to-Many | `category_id` | Categorizes clothing products under specific store departments. |
| `products` | `product_variants` | One-to-Many | `product_id` | Associates master product information with specific physical attributes (Size, Color). |
| `products` | `product_images` | One-to-Many | `product_id` | Links multiple visual media assets to a clothing product. |
| `product_variants` | `inventory` | One-to-One | `variant_id` | Binds real-time stock quantity counts directly to specific variant SKUs. |
| `product_variants` | `cart_items` | One-to-Many | `variant_id` | Connects specific clothing variants to active customer cart items. |
| `product_variants` | `wishlist_items` | One-to-Many | `variant_id` | Connects specific clothing variants to customer wishlist items. |
| `product_variants` | `order_items` | One-to-Many | `variant_id` | Links purchased order lines to specific variant SKUs for inventory decrementing. |
| `carts` | `cart_items` | One-to-Many | `cart_id` | Organizes individual items inside a shopping cart session. |
| `wishlists` | `wishlist_items` | One-to-Many | `wishlist_id` | Organizes saved items inside a customer wishlist. |
| `orders` | `order_items` | One-to-Many | `order_id` | Groups purchased line items under a single order transaction record. |

## 7. Primary Key Strategy

* **Surrogate Keys:** All tables utilize integer surrogate primary keys (`_id`) for consistent indexing, predictable join performance, and simplicity in SQLAlchemy relationship mappings.
* **Natural Keys:** Unique constraints (`UQ`) are applied to natural identifiers such as `sku` in `product_variants` and `email` in `users` to prevent duplicate business records.

## 8. Foreign Key Strategy

* **Referential Integrity:** Foreign keys are explicitly enforced with `ON DELETE RESTRICT` or `ON DELETE CASCADE` rules depending on entity dependencies. For example, deleting a product cascades to variants and images, whereas deleting a user with existing orders is restricted to preserve financial and operational audit trails.

## 9. Data Integrity Rules

* **NOT NULL Constraints:** Essential operational columns (`email`, `password_hash`, `product_name`, `sku`, `stock_quantity`, `unit_price`) enforce `NOT NULL` constraints.
* **Check Constraints:** Applied where applicable (e.g., `stock_quantity >= 0`, `base_price > 0`) to prevent invalid data states.

## 10. Indexing Strategy

* **Unique Indexes:** `users.email`, `product_variants.sku`, `categories.slug`.
* **Performance Indexes:** `products.category_id`, `orders.user_id`, `inventory.variant_id`, `cart_items.cart_id` to optimize frequent WHERE clauses and JOIN operations executed via SQLAlchemy.

## 11. Historical Data Requirements

* Order line items (`order_items`) store snapshot pricing (`unit_price`) at the time of purchase to ensure historical financial records remain unaffected by subsequent product price updates.

## 12. Audit Requirements

* Core transactional tables (`users`, `products`, `orders`) include timestamp columns (`created_at`, `updated_at`) managed automatically to track record creation and modification lifecycles.

## 13. Database Security Considerations

* **Credential Protection:** Plaintext passwords are strictly prohibited; only bcrypt hashes are stored in `users.password_hash`.
* **SQL Injection Prevention:** Parameterized queries handled natively through SQLAlchemy ORM guard against SQL injection vulnerabilities.
* **Access Control:** Database user accounts utilized by the FastAPI application will operate under least-privilege principles.

## 14. Pending Technical Decisions

* **PTD-02:** Confirmation of database connection pooling parameters and async driver selection (`aiomysql` vs `PyMySQL`) for FastAPI performance optimization.

## 15. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature |
| :--- | :--- | :--- | :--- | :--- |
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — |
| *[Pending]* | Senior Database Architect / Technical Lead | **Pending Review** | — | — |
