# Sprint 06: Admin Dashboard, Verified Reviews & E2E QA

## A. Sprint Overview
- **Sprint ID**: SPRINT_06
- **Sprint Name**: Admin Dashboard, Verified Reviews & E2E QA
- **Duration**: 6 Working Days
- **Business Purpose**: Provide store administrators with comprehensive sales analytics and management tools, enable verified buyer reviews with fit feedback (`TRUE_TO_SIZE`, `RUNS_SMALL`) and photo uploads (`review_images_json`), manage marketing banners (`advertisements`), and execute complete End-to-End (E2E) Quality Assurance.
- **Expected Outcome**: Fully polished e-commerce platform ready for production deployment.
- **Dependencies**: All previous sprints.

## B. Database Tasks
- Verify tables: `reviews`, `advertisements`, `orders`, `products`.
- Ensure unique constraint on `(user_id, product_id)` in `reviews` to prevent duplicate reviews.
- Verify index performance across all modules.

## C. Backend Development Tasks
1. **Admin Analytics API (`/api/v1/admin/dashboard`)**: Aggregate revenue, total orders, active products, and low stock inventory counts.
2. **Verified Reviews API (`/api/v1/reviews`)**: 
   - Customers with a delivered `order_item_id` can submit star ratings (1-5), fit feedback, text comments, and image JSON.
   - Admin approval endpoint (`is_approved`).
3. **Advertisements & Banners API (`/api/v1/advertisements`)**: Manage promotional banners (`HOME_HERO`, `CATEGORY_TOP`) for frontend display.

## D. Frontend Development Tasks
1. **Admin Dashboard UI**: Analytics widgets, sales charts (Recharts), and quick-action cards.
2. **Verified Review Submission UI**: Star rating widget, fit feedback selector, and photo upload component on delivered products.
3. **Homepage Banner Carousel**: Dynamic rendering of promotional advertisements from `/api/v1/advertisements`.
4. **E2E Polish & Responsive Check**: Ensure flawless mobile and desktop responsiveness across all screens.

## E. API Integration & Communication
- Frontend integrates admin metrics, review submission, and promotional banner endpoints.

## F. Testing & QA
- Execute comprehensive Cypress E2E test suites covering: Guest browsing -> Cart -> Checkout -> Payment -> Shipment Tracking -> Return -> Verified Review.
- Security audit (SQL injection, XSS prevention, JWT token expiration).

## G. Sprint Deliverables
- Complete Admin Dashboard, Verified Reviews system, Banner management, and E2E test coverage.

## H. Definition of Done (DoD)
- All automated E2E tests pass successfully.
- Platform approved for production release readiness.

## I. Developer Task Breakdown
- **BE-001**: Implement Admin Analytics and Dashboard aggregation APIs.
- **BE-002**: Implement Verified Reviews API with `order_item_id` validation (`reviews`).
- **BE-003**: Implement Advertisements management API (`advertisements`).
- **FE-001**: Build Admin Analytics Dashboard UI with charts.
- **FE-002**: Build Verified Review submission modal with fit feedback and image upload.
- **FE-003**: Integrate homepage advertisement carousel.
- **QA-001**: Execute full Cypress E2E user journey testing and security validation.
