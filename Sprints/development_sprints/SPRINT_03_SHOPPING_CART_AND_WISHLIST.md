# Sprint 03: Shopping Cart, Guest Session Sync & Wishlist

## A. Sprint Overview
- **Sprint ID**: SPRINT_03
- **Sprint Name**: Shopping Cart, Guest Session Sync & Wishlist
- **Duration**: 5 Working Days
- **Business Purpose**: Enable seamless shopping cart persistence for both guest users (via cookies/UUID `session_id`) and logged-in customers (`user_id`), along with wishlist management.
- **Expected Outcome**: Fully operational cart drawer, cart item quantity updates, guest-to-user cart migration upon login, and customer wishlist toggles.
- **Dependencies**: Sprint 01 (Auth) & Sprint 02 (Products & Variants).

## B. Database Tasks
- Verify tables: `carts`, `cart_items`, `wishlists`, `wishlist_items`.
- Ensure unique constraints on `(cart_id, variant_id)` and `(wishlist_id, variant_id)`.
- Ensure `carts.user_id` is nullable to support guest carts.

## C. Backend Development Tasks
1. **Cart Management API (`/api/v1/cart`)**: 
   - Get cart items for current user or guest session (`session_id`).
   - Add item / update quantity / remove item from `cart_items`.
2. **Cart Migration on Login (`POST /api/v1/auth/sync-cart`)**: Merge guest cart items into user's persistent cart upon successful login.
3. **Wishlist API (`/api/v1/wishlist`)**: Toggle products/variants in customer wishlist (`wishlists`, `wishlist_items`).

## D. Frontend Development Tasks
1. **Cart Context & Slide-out Drawer**: Global state management for cart items, subtotal calculation, and quick drawer view.
2. **Cart Page**: Full cart review screen with quantity increment/decrement controls and item removal.
3. **Wishlist Screen**: Grid view of saved items with "Move to Cart" action.
4. **Guest Session Handler**: Generate and persist guest `session_id` in browser cookies.

## E. API Integration & Communication
- Frontend communicates with `/api/v1/cart` and `/api/v1/wishlist`.
- Automatic cart sync triggered immediately after successful login/registration.

## F. Testing & QA
- Test guest cart creation and persistence across browser sessions.
- Verify cart merging behavior when a guest logs in.

## G. Sprint Deliverables
- Cart and Wishlist backend APIs and frontend drawer/pages.

## H. Definition of Done (DoD)
- Guest users can add items to cart, log in, and see their cart items correctly merged into their user account.

## I. Developer Task Breakdown
- **BE-001**: Implement Cart CRUD APIs with guest `session_id` and user linkage (`carts`, `cart_items`).
- **BE-002**: Implement Cart Migration logic on login.
- **BE-003**: Implement Wishlist APIs (`wishlists`, `wishlist_items`).
- **FE-001**: Build Cart Drawer, Cart Page, and Wishlist interface.
- **FE-002**: Implement Guest Session tracking and Cart-Sync on login.
- **QA-001**: Test guest checkout transition to registered user cart.
