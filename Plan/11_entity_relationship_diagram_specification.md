# Entity Relationship Diagram (ERD) Specification: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | Entity Relationship Diagram & Schema Topology Specification | 
| **Document ID** | DOC-DB-004 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior Database Architect | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website

* **Target Technology Stack:** MySQL 8.x, SQLAlchemy ORM

* **Document Purpose:** To define the structural entity relationship topology, cardinality, foreign key mappings, and Mermaid ERD visualization for all approved database tables.

## 2. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | Senior Database Architect | Initial ERD specification matching approved Database Schema Design and Data Dictionary. | 

## 3. ERD Overview

This document provides the visual and structural blueprint of the MySQL relational database architecture. The system utilizes normalized tables adhering to Third Normal Form (3NF) to support user management, role-based access control, hierarchical product categories, variant-level clothing attributes, inventory tracking, active carts, wishlists, and order fulfillment.

## 4. Complete Entity List

* `users`: Stores user login credentials, password hashes, and profiles.

* `roles`: Defines system access roles for RBAC.

* `user_addresses`: Stores shipping and billing addresses for customers.

* `categories`: Organizes clothing into hierarchical multi-level categories.

* `products`: Stores master clothing product details and base metadata.

* `product_variants`: Tracks specific clothing attributes (Size, Color, Material) and SKUs.

* `product_images`: Stores image asset URLs and display orders.

* `inventory`: Manages real-time stock levels bound to variant SKUs.

* `carts`: Manages active customer shopping cart sessions.

* `cart_items`: Captures line items within active shopping carts.

* `wishlists`: Stores saved items for registered customers.

* `wishlist_items`: Line items associated with customer wishlists.

* `orders`: Records completed checkout transactions and fulfillment status.

* `order_items`: Captures permanent line-item snapshots for each order.

## 5. Entity Relationships & Cardinality Matrix

| Parent Entity | Child Entity | Relationship | Cardinality | Foreign Key | Business Rule | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| `users` | `user_addresses` | Has Addresses | One-to-Many | `user_id` | A customer can maintain multiple shipping and billing addresses. | 
| `users` | `carts` | Owns Cart | One-to-One | `user_id` | Each registered customer maintains one active shopping cart session. | 
| `users` | `wishlists` | Owns Wishlist | One-to-One | `user_id` | Each registered customer maintains one active wishlist container. | 
| `users` | `orders` | Places Orders | One-to-Many | `user_id` | A registered customer can place multiple order transactions over time. | 
| `user_addresses` | `orders` | Fulfills Order | One-to-Many | `address_id` | Each order references a specific snapshot shipping address. | 
| `categories` | `categories` | Subcategory Tree | Self-Referencing | `parent_id` | Categories can have subcategories for multi-level clothing navigation. | 
| `categories` | `products` | Categorizes | One-to-Many | `category_id` | A category can contain multiple clothing products. | 
| `products` | `product_variants` | Has Variants | One-to-Many | `product_id` | A master product has multiple physical variants (Size/Color combinations). | 
| `products` | `product_images` | Has Media | One-to-Many | `product_id` | A clothing product can have multiple associated image assets. | 
| `product_variants` | `inventory` | Stock Level | One-to-One | `variant_id` | Each variant SKU maintains exactly one real-time inventory stock record. | 
| `product_variants` | `cart_items` | Cart Line | One-to-Many | `variant_id` | Specific variants can be added to multiple customer shopping carts. | 
| `product_variants` | `wishlist_items` | Wishlist Line | One-to-Many | `variant_id` | Specific variants can be saved across multiple customer wishlists. | 
| `product_variants` | `order_items` | Order Line | One-to-Many | `variant_id` | Purchased variants are linked permanently to order line snapshots. | 
| `carts` | `cart_items` | Cart Contents | One-to-Many | `cart_id` | A shopping cart contains multiple active cart line items. | 
| `wishlists` | `wishlist_items` | Wishlist Contents | One-to-Many | `wishlist_id` | A wishlist contains multiple saved wishlist items. | 
| `orders` | `order_items` | Order Contents | One-to-Many | `order_id` | An order record contains multiple purchased line items. | 

## 6. Mermaid ERD Visualization

```mermaid
erDiagram
    users {
        int user_id PK
        varchar email UK
        varchar password_hash
        varchar first_name
        varchar last_name
        timestamp created_at
        timestamp updated_at
    }

    roles {
        int role_id PK
        varchar role_name UK
        text description
    }

    user_addresses {
        int address_id PK
        int user_id FK
        varchar street_address
        varchar city
        varchar state
        varchar postal_code
        varchar country
        boolean is_default
    }

    categories {
        int category_id PK
        int parent_id FK
        varchar category_name
        varchar slug UK
        text description
    }

    products {
        int product_id PK
        int category_id FK
        varchar product_name
        varchar brand
        text description
        decimal base_price
        boolean is_active
    }

    product_variants {
        int variant_id PK
        int product_id FK
        varchar sku UK
        varchar size
        varchar color
        varchar material
        decimal price_override
    }

    product_images {
        int image_id PK
        int product_id FK
        varchar image_url
        int display_order
        boolean is_primary
    }

    inventory {
        int inventory_id PK
        int variant_id FK
        int stock_quantity
        int low_stock_threshold
        timestamp updated_at
    }

    carts {
        int cart_id PK
        int user_id FK
        timestamp created_at
        timestamp updated_at
    }

    cart_items {
        int cart_item_id PK
        int cart_id FK
        int variant_id FK
        int quantity
    }

    wishlists {
        int wishlist_id PK
        int user_id FK
        timestamp created_at
    }

    wishlist_items {
        int wishlist_item_id PK
        int wishlist_id FK
        int variant_id FK
        timestamp added_at
    }

    orders {
        int order_id PK
        int user_id FK
        int address_id FK
        decimal total_amount
        varchar order_status
        timestamp created_at
    }

    order_items {
        int order_item_id PK
        int order_id FK
        int variant_id FK
        int quantity
        decimal unit_price
    }

    users ||--o{ user_addresses : "has"
    users ||--|| carts : "owns"
    users ||--|| wishlists : "owns"
    users ||--o{ orders : "places"
    user_addresses ||--o{ orders : "fulfills"
    categories ||--o{ categories : "subcategories"
    categories ||--o{ products : "categorizes"
    products ||--o{ product_variants : "has"
    products ||--o{ product_images : "has"
    product_variants ||--|| inventory : "tracks"
    product_variants ||--o{ cart_items : "in"
    product_variants ||--o{ wishlist_items : "saved_in"
    product_variants ||--o{ order_items : "purchased_as"
    carts ||--o{ cart_items : "contains"
    wishlists ||--o{ wishlist_items : "contains"
    orders ||--o{ order_items : "contains"
```

## 7. Data Integrity Considerations

* **Referential Action Triggers:** Foreign key constraints utilize `RESTRICT` on parent deletions where historical data must be preserved (such as `users` and `orders`), and `CASCADE` where child entities depend entirely on parent lifecycles (such as `products` to `product_variants`).

* **Atomic Inventory Reduction:** Order placement transactions execute within SQLAlchemy session commits, ensuring stock decrements occur atomically alongside order creation.

## 8. Pending Technical Decisions

* **PTD-02:** Confirmation of database connection pool sizing and asynchronous query performance tuning via SQLAlchemy.

## 9. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *\[Pending\]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *\[Pending\]* | Senior Database Architect | **Pending Review** | — | — | 
