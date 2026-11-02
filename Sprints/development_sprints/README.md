# Prabha Technology - Clothing E-Commerce Website: Development Sprint Package

## 1. Project Overview
This repository contains the comprehensive, enterprise-grade development sprint documentation for the **Clothing E-Commerce Website**. The architecture is built on **Python Flask**, **Flask REST APIs**, **SQLAlchemy ORM**, **PostgreSQL / MySQL 8.0+**, **JWT Authentication**, and **React.js with Material UI (MUI)**.

The database schema is strictly locked and finalized based on the provided production DDL script, covering Users & RBAC, Hierarchical Categories & Size Charts, Products & Inventory, Carts & Wishlists, Orders & GST Calculations, Payments (Prepaid & COD), Shipments, Item-Level Returns & Exchanges, Advertisements, and Verified Reviews with Fit Feedback.

---

## 2. Sprint Index & Sequence

| Sprint ID | Sprint Name | Duration | Core Modules Covered | Primary Database Tables |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 01** | Project Foundation & Authentication | 5 Days | Setup, JWT Auth, RBAC, Addresses | `users`, `roles`, `user_roles`, `user_addresses` |
| **Sprint 02** | Product Catalog, Size Charts & Inventory | 7 Days | Categories, Size Charts, Products, Variants, Images, Inventory | `categories`, `size_charts`, `products`, `product_variants`, `product_images`, `inventory` |
| **Sprint 03** | Shopping Cart, Guest Sync & Wishlist | 5 Days | Carts, Guest Session Tracking, Wishlist | `carts`, `cart_items`, `wishlists`, `wishlist_items` |
| **Sprint 04** | Checkout, GST Calculation & Payments | 7 Days | Orders, Order Items, Discounts, Payments | `orders`, `order_items`, `discounts`, `payments` |
| **Sprint 05** | Shipment Tracking & Item-Level Returns | 6 Days | Shipments, Returns, Size Exchanges | `shipments`, `returns`, `order_items` |
| **Sprint 06** | Admin Dashboard, Reviews & E2E QA | 6 Days | Admin Analytics, Verified Reviews, Advertisements | `reviews`, `advertisements`, `orders`, `products` |

---

## 3. Development Workflow & Guidelines
- **Backend**: Flask Blueprints, SQLAlchemy ORM, Marshmallow validation, centralized exception handling.
- **Frontend**: React.js, Material UI v5, Axios HTTP client with JWT interceptor.
- **Git Workflow**: Feature branch workflow (`feature/sprint-X-module-name`), Pull Request reviews required before merging to `main`.
- **Database Adherence**: Strictly adhere to the locked PostgreSQL/MySQL schema. Do not modify table names, column types, or foreign key constraints without formal approval.
