# Sprint 02: Product Catalog, Size Charts & Inventory

## A. Sprint Overview
- **Sprint ID**: SPRINT_02
- **Sprint Name**: Product Catalog, Size Charts & Inventory
- **Duration**: 7 Working Days
- **Business Purpose**: Enable apparel categorization, size chart guides (`size_charts`), multi-variant product management (`products`, `product_variants`, `product_images`), and real-time inventory stock tracking (`inventory`).
- **Expected Outcome**: Admin product catalog management and customer-facing catalog browsing with variant selection (size, color swatches) and stock availability.
- **Dependencies**: Sprint 01 (Auth & Admin RBAC).

## B. Database Tasks
- Verify tables: `categories`, `size_charts`, `products`, `product_variants`, `product_images`, `inventory`.
- Implement check constraints on `inventory.stock_quantity >= 0` and `reserved_quantity >= 0`.
- Create performance indexes: `idx_products_category`, `idx_variants_product`, `idx_variants_color_size`.

## C. Backend Development Tasks
1. **Category Hierarchy API (`/api/v1/categories`)**: Support multi-level category tree navigation using `parent_id`.
2. **Size Charts API (`/api/v1/size-charts`)**: Manage apparel measurement charts using `measurements_json` (e.g., chest, length, shoulder).
3. **Product Catalog CRUD (`/api/v1/products`)**: Admin endpoints to create products with attributes (`fit_type`, `fabric_care`, `hsn_code`, `gst_percentage`, `mrp`, `base_price`).
4. **Product Variants & Inventory API (`/api/v1/products/{id}/variants`)**: Manage SKUs, sizes, colors (`color_hex`), and bind real-time stock levels in `inventory`.
5. **Catalog Filtering & Search (`GET /api/v1/products`)**: Support filtering by category, size, color, fit type, and price range with pagination.

## D. Frontend Development Tasks
1. **Storefront Homepage**: Hero banner display and featured category grid.
2. **Product Listing Page (PLP)**: Advanced sidebar filters (Size, Color swatches, Price range, Fit type) and product grid cards.
3. **Product Detail Page (PDP)**: Image gallery linked to color variants, size selector with Size Chart modal, and live stock status.
4. **Admin Product Management**: CRUD dashboard for store admins to manage categories, products, variants, and stock quantities.

## E. API Integration & Communication
- Frontend consumes `/api/v1/categories`, `/api/v1/products`, and `/api/v1/size-charts`.
- Dynamic variant selection updates displayed price (`base_price` or `price_override`) and stock status instantly.

## F. Testing & QA
- Test category hierarchy recursion.
- Verify inventory stock constraints and low stock threshold alerts.

## G. Sprint Deliverables
- Fully functional product catalog and inventory tracking backend and UI.

## H. Definition of Done (DoD)
- Admin can successfully add garments with size/color variants and inventory counts.
- Customers can browse, filter, and inspect product size charts.

## I. Developer Task Breakdown
- **BE-001**: Implement Category and Size Chart APIs (`categories`, `size_charts`).
- **BE-002**: Implement Product Catalog and Variant APIs (`products`, `product_variants`, `product_images`, `inventory`).
- **FE-001**: Build Storefront PLP with sidebar filters and search.
- **FE-002**: Build Product Detail Page (PDP) with color swatches, image gallery, and Size Chart modal.
- **FE-003**: Build Admin Product & Inventory management screens.
- **QA-001**: Validate filter combinations and stock level synchronization.
