# Sprint 04: Checkout, GST Calculation & Payments

## A. Sprint Overview
- **Sprint ID**: SPRINT_04
- **Sprint Name**: Checkout, GST Tax Calculation & Payments
- **Duration**: 7 Working Days
- **Business Purpose**: Implement robust checkout flow including address selection, Indian GST tax calculation per item based on HSN codes, coupon/discount validation (`discounts`), order placement with human-readable order numbers (`orders`, `order_items`), and payment gateway integration (Prepaid Razorpay/Cashfree + Cash on Delivery).
- **Expected Outcome**: Complete end-to-end checkout experience with secure payment processing and inventory reservation.
- **Dependencies**: Sprint 01, 02, and 03.

## B. Database Tasks
- Verify tables: `orders`, `order_items`, `discounts`, `payments`.
- Verify JSONB snapshots (`shipping_address_snapshot`, `gateway_response`) and immutable historical price snapshots (`unit_price`, `mrp`, `tax_amount`, `net_total`) in `order_items`.
- Implement row-level locking (`SELECT ... FOR UPDATE`) during order placement to prevent inventory overselling.

## C. Backend Development Tasks
1. **Coupon & Discount Validation API (`/api/v1/discounts/validate`)**: Check expiry, min order amount, usage limits, and max discount caps.
2. **Checkout Calculation Engine**: Compute subtotal, prorated discount shares, GST HSN tax amounts, and shipping fees.
3. **Order Placement API (`POST /api/v1/orders`)**: Generate unique `order_number` (e.g. `PT-2026-00001`), snapshot shipping address and line items, decrement `inventory.stock_quantity`, increment `reserved_quantity`, and clear cart.
4. **Payment Gateway Webhook (`POST /api/v1/payments/webhook`)**: Handle Razorpay/Cashfree asynchronous payment success/failure webhooks, update `order_status` to `CONFIRMED` and `payment_status` to `PAID`.

## D. Frontend Development Tasks
1. **Multi-Step Checkout Flow**: 
   - Step 1: Delivery Address Selection.
   - Step 2: Order Summary with GST breakdown & Coupon code input.
   - Step 3: Payment Method Selection (Prepaid / COD).
2. **Payment Gateway SDK Integration**: Integrate Razorpay/Cashfree checkout popup for prepaid orders.
3. **Order Success Screen**: Display order confirmation, order number, and delivery estimates.

## E. API Integration & Communication
- Frontend interacts with `/api/v1/orders`, `/api/v1/discounts/validate`, and payment initiation endpoints.
- Secure handling of payment gateway callback verification.

## F. Testing & QA
- Test concurrent order placements to verify inventory reservation integrity.
- Simulate payment webhook payloads (Success, Failed, Refunded).

## G. Sprint Deliverables
- Fully functional checkout, GST calculation, order placement, and payment gateway integration.

## H. Definition of Done (DoD)
- Successful order placement correctly reserves inventory, applies coupon discounts, records immutable line-item snapshots, and processes payment.

## I. Developer Task Breakdown
- **BE-001**: Implement Coupon Validation API (`discounts`).
- **BE-002**: Implement Checkout Calculation Engine and Order Placement API with inventory concurrency control (`orders`, `order_items`, `inventory`).
- **BE-003**: Implement Payment Gateway Integration & Webhook handler (`payments`).
- **FE-001**: Build Multi-step Checkout screen and Coupon input component.
- **FE-002**: Integrate payment gateway SDK (Razorpay/Cashfree) and Order Success screen.
- **QA-001**: Perform end-to-end checkout testing for both Prepaid and COD methods.
