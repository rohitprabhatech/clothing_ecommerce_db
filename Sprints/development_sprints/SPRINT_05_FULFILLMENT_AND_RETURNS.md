# Sprint 05: Shipment Tracking & Item-Level Returns

## A. Sprint Overview
- **Sprint ID**: SPRINT_05
- **Sprint Name**: Shipment Tracking & Item-Level Returns
- **Duration**: 6 Working Days
- **Business Purpose**: Enable order fulfillment tracking via shipping aggregators (`shipments`, AWB tracking) and item-level returns and size exchanges (`returns`, `exchange_variant_id`, warehouse QC status) which are essential for apparel e-commerce.
- **Expected Outcome**: Admin shipment manifest management, customer AWB tracking view, and item-specific return/exchange request workflows.
- **Dependencies**: Sprint 04 (Orders & Order Items).

## B. Database Tasks
- Verify tables: `shipments`, `returns`, `order_items`.
- Ensure foreign key linkage from `returns.order_item_id` to specific garments and `exchange_variant_id` to `product_variants`.

## C. Backend Development Tasks
1. **Shipment Management API (`/api/v1/admin/shipments`)**: Create/update shipment records with courier name, tracking number, tracking URL, and status (`MANIFESTED`, `SHIPPED`, `DELIVERED`).
2. **Item-Level Return & Exchange API (`POST /api/v1/returns`)**: Allow customers to request a return or size exchange for a specific `order_item_id` with reasons (`SIZE_TOO_SMALL`, `DEFECTIVE`) and optional `exchange_variant_id`.
3. **Warehouse QC & Return Processing (`PUT /api/v1/admin/returns/{id}`)**: Admin endpoints to update QC status (`PASSED`, `FAILED`) and trigger refund or inventory restock.

## D. Frontend Development Tasks
1. **Customer Order History & Tracking**: Order detail view with timeline modal displaying shipment status and tracking link.
2. **Return & Exchange Request Modal**: Form allowing customers to select a specific garment from an order, choose Return vs Exchange, select new size/variant, and provide reasons.
3. **Admin Fulfillment & Return Dashboard**: Screens for warehouse managers to manage shipments, AWB numbers, and return quality checks (QC).

## E. API Integration & Communication
- Frontend consumes `/api/v1/orders/{id}/shipment` and `/api/v1/returns`.
- Real-time status updates reflecting order and return lifecycles.

## F. Testing & QA
- Test size exchange workflow ensuring correct variant replacement and inventory adjustment.
- Verify prorated discount share calculation for partial returns.

## G. Sprint Deliverables
- Shipment tracking, AWB management, and item-level return/exchange workflows.

## H. Definition of Done (DoD)
- Customers can track shipments and initiate size exchanges for specific items; admins can process warehouse QC and approvals.

## I. Developer Task Breakdown
- **BE-001**: Implement Shipment tracking APIs (`shipments`).
- **BE-002**: Implement Item-level Return & Exchange APIs (`returns`, `order_items`).
- **FE-001**: Build Customer Order History, Shipment tracking modal, and Return/Exchange request form.
- **FE-002**: Build Admin Fulfillment and Return QC management screens.
- **QA-001**: Test return/exchange state transitions and prorated refunds.
