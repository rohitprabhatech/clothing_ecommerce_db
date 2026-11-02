# Database Requirements Analysis: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | Database Requirements Analysis | 
| **Document ID** | DOC-DB-001 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior Database Architect & Backend Technical Lead | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | Database Architect | Initial database entity analysis based on approved SRS and BRD. | 

## 2. Introduction & Analysis Methodology

This document provides a systematic evaluation of all potential data entities for the **Clothing E-Commerce Website** utilizing MySQL and SQLAlchemy ORM. In accordance with project rules, database tables are not automatically created for unapproved or pending features. Each entity is assessed against confirmed business requirements (`BR-XXX`) and functional specifications (`FR-XXX`), and classified as **Required**, **Optional**, **Future Enhancement**, or **Not Required**.

## 3. Entity Evaluation & Classification Matrix

| Table Name | Business Purpose | Key Relationships | Required By Requirement | Priority | Approval Status & Classification | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| `users` | Stores customer and administrative user credentials, profiles, and authentication data. | 1:N with `orders`, `user_addresses`, `carts`, `wishlists` | BR-USR-01, FR-USR-01 | High | **Required** (Confirmed Core Entity) | 
| `roles` | Defines system roles (Guest, Customer, Store Admin, Super Admin) for RBAC. | N:M with `users` | BR-USR-01, FR-USR-01 | High | **Required** (Confirmed Core Entity) | 
| `user_addresses` | Stores customer shipping and billing addresses for order fulfillment. | N:1 with `users`, 1:N with `orders` | BR-ORD-01, FR-ORD-01 | High | **Required** (Confirmed Core Entity) | 
| `categories` | Organizes clothing into hierarchical multi-level categories (e.g., Men $\rightarrow$ Tops). | Self-referencing (Parent-Child), 1:N with `products` | BR-CAT-01, FR-CAT-01 | High | **Required** (Confirmed Core Entity) | 
| `products` | Stores master clothing product details (name, description, brand, base metadata). | N:1 with `categories`, 1:N with `product_variants`, `product_images` | BR-CAT-02, FR-CAT-02 | High | **Required** (Confirmed Core Entity) | 
| `product_variants` | Tracks specific clothing attributes (Size, Color, Material) and unique SKUs. | N:1 with `products`, 1:N with `inventory`, `cart_items`, `order_items` | BR-CAT-02, FR-CAT-02 | High | **Required** (Confirmed Core Entity) | 
| `product_images` | Stores image asset URLs and display ordering for products and variants. | N:1 with `products` | BR-CAT-02 | Medium | **Required** (Confirmed Core Entity) | 
| `inventory` | Manages real-time stock levels bound to specific product variant SKUs. | 1:1 or 1:N with `product_variants` | BR-CAT-02, FR-CAT-02 | High | **Required** (Confirmed Core Entity) | 
| `carts` / `cart_items` | Manages active customer shopping cart persistence across sessions. | N:1 with `users`, N:1 with `product_variants` | BR-CRT-01, FR-CRT-01 | Medium | **Required** (Confirmed Core Entity) | 
| `wishlists` / `wishlist_items` | Stores saved items for registered customers for future purchase. | N:1 with `users`, N:1 with `product_variants` | BR-CRT-01, FR-CRT-01 | Low | **Required** (Confirmed Core Entity) | 
| `orders` | Records completed checkout transactions, order totals, and fulfillment status. | N:1 with `users`, N:1 with `user_addresses`, 1:N with `order_items` | BR-ORD-01, FR-ORD-01 | High | **Required** (Confirmed Core Entity) | 
| `order_items` | Captures line-item snapshots (variant, price, quantity) for each order. | N:1 with `orders`, N:1 with `product_variants` | BR-ORD-01, FR-ORD-01 | High | **Required** (Confirmed Core Entity) | 
| `payments` / `payment_transactions` | Tracks payment gateway interaction, status, and transaction references. | N:1 with `orders` | PBD-03 (Awaiting Gateway Approval) | High | **Optional / Pending Decision** (Deferred until PBD-03 confirmed) | 
| `discounts` / `coupons` | Manages promotional discount codes and promotional pricing rules. | N:1 with `orders` (optional link) | PBD (Unconfirmed) | Low | **Future Enhancement** | 
| `advertisements` / `banners` | Manages promotional banners and frontend marketing displays. | Independent / Content Management | PBD (Unconfirmed) | Low | **Future Enhancement** | 
| `shipments` / `tracking` | Tracks shipping courier details, tracking numbers, and delivery milestones. | N:1 with `orders` | BR-ORD-01 | Medium | **Optional / Pending Decision** (Deferred until shipping rules confirmed) | 
| `reviews` / `ratings` | Stores customer star ratings and text feedback on purchased clothing items. | N:1 with `products`, N:1 with `users` | PBD (Unconfirmed) | Low | **Future Enhancement** | 
| `returns` / `refunds` | Manages apparel return requests, item inspection status, and refund processing. | N:1 with `orders`, N:1 with `order_items` | PBD-05 (Awaiting Return Policy) | Medium | **Optional / Pending Decision** (Deferred until return policy confirmed) | 

## 4. Architectural Observations & SQLAlchemy Mapping Strategy

* **Normalization:** All required relational tables will be designed to Third Normal Form (3NF) to ensure data integrity and prevent anomalies.
* **ORM Integration:** SQLAlchemy declarative models will utilize relationship mapping (`relationship`, `back_populates`) to handle complex queries between users, variants, and orders efficiently.
* **Pending Feature Handling:** Tables classified as **Optional / Pending Decision** or **Future Enhancement** will be excluded from the initial database schema design until their respective business rules (PBD-03, PBD-05, Shipping rules) are officially approved by stakeholders.

## 5. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *[Pending]* | Database Architect / Technical Lead | **Pending Review** | — | — | 

## Review Checklist

Before approving this document (`DATABASE_REQUIREMENTS_ANALYSIS.md`), please review:
1. **Entity Selection:** Are all necessary core entities for clothing retail included in the required set?
2. **Pending Feature Exclusion:** Are unconfirmed features (payments, returns, reviews) correctly classified as pending or future enhancements rather than forced into the core schema?
3. **Traceability:** Do the entities map cleanly to our approved BRD and SRS requirements?