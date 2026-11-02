# Use Cases & User Journeys Specification: Clothing E-Commerce Website

| Field | Details |
| :--- | :--- |
| **Document Title** | Use Cases and User Journeys Document |
| **Document ID** | DOC-REQ-004 |
| **Version** | 1.0 |
| **Status** | Draft / Pending Review |
| **Prepared By** | Senior Business Analyst & Product Manager |
| **Review Status** | Pending Stakeholder Approval |

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website
* **Target Technology Stack:** React.js (Frontend), Python FastAPI (Backend), MySQL (Database), SQLAlchemy (ORM)
* **Document Purpose:** To define the formal use cases and end-to-end user journeys for all approved user roles within the clothing e-commerce platform.

## 2. Revision History

| Version | Date | Author | Description / Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-06-06 | Senior Business Analyst & Product Manager | Initial drafting of formal use cases and user journeys based on approved SRS and User Roles specifications. |

## 3. Use Case Overview

This section details the formal functional interactions between system actors (Guest Visitors, Registered Customers, Store Admins, Super Admins) and the e-commerce platform. Every use case strictly corresponds to approved requirements without introducing unconfirmed features.

## 4. Detailed Use Cases

### Use Case 1: User Registration & Authentication

| Field | Specification |
| :--- | :--- |
| **Use Case ID** | UC-01 |
| **Use Case Name** | User Registration & Login |
| **Primary Actor** | Guest Visitor / Customer |
| **Goal** | Create a secure user account or authenticate existing credentials to access personalized platform features. |
| **Preconditions** | User has internet access and a valid un-registered email address (for registration). |
| **Trigger** | User clicks "Sign Up" or "Login" on the navigation header (`SCR-AUTH-01`, `SCR-AUTH-02`). |
| **Main Flow** | 1. User navigates to the registration/login screen.<br>2. User enters required credentials (name, email, password).<br>3. System validates input formats via client-side rules.<br>4. User submits the form.<br>5. FastAPI backend hashes the password (bcrypt), stores record in MySQL (`users`), and issues a JWT token.<br>6. Frontend stores the token and redirects the user to the home page or account dashboard. |
| **Alternate Flow** | Existing user logging in directly skips registration and provides email/password for immediate token issuance. |
| **Error Flow** | 1. If email is already registered, backend returns HTTP 400 Bad Request.<br>2. If password credentials are invalid during login, backend returns HTTP 401 Unauthorized.<br>3. Frontend displays inline validation or toast alert errors. |
| **Postconditions** | User is successfully authenticated with an active session token. |
| **Related Requirements** | BR-USR-01, FR-USR-01, SCR-AUTH-01, SCR-AUTH-02 |

### Use Case 2: Browse & Filter Clothing Catalog

| Field | Specification |
| :--- | :--- |
| **Use Case ID** | UC-02 |
| **Use Case Name** | Browse, Filter, and View Clothing Products |
| **Primary Actor** | Guest Visitor / Registered Customer |
| **Goal** | Discover clothing products by navigating categories and applying filters (size, color, price). |
| **Preconditions** | Products and categories exist in the MySQL database. |
| **Trigger** | User clicks a category link on the home page or search navigation (`SCR-CUST-01`, `SCR-CUST-02`). |
| **Main Flow** | 1. User selects a category (e.g., Men $\rightarrow$ Tops).<br>2. Frontend sends `GET /api/v1/products?category_id=X`.<br>3. FastAPI queries MySQL via SQLAlchemy, returning filtered product summaries.<br>4. User applies secondary filters (Size: L, Color: Blue).<br>5. UI updates dynamically to display matching clothing items. |
| **Alternate Flow** | User performs a keyword search across product descriptions and titles. |
| **Error Flow** | If no products match the filter criteria, the system displays a clean empty state with a reset filter button. |
| **Postconditions** | User views the filtered product catalog listing. |
| **Related Requirements** | BR-CAT-01, BR-CAT-02, FR-CAT-01, FR-CAT-02, SCR-CUST-01, SCR-CUST-02 |

### Use Case 3: Select Variant & Manage Cart

| Field | Specification |
| :--- | :--- |
| **Use Case ID** | UC-03 |
| **Use Case Name** | Product Variant Selection & Shopping Cart Management |
| **Primary Actor** | Registered Customer |
| **Goal** | Select specific clothing variants (Size, Color) on the Product Detail Page (PDP) and manage cart items. |
| **Preconditions** | User is authenticated; product variants and inventory are stocked (`SCR-CUST-03`, `SCR-CUST-04`). |
| **Trigger** | User clicks on a product card from the catalog list. |
| **Main Flow** | 1. User views the Product Detail Page (PDP) showing images and descriptions.<br>2. User selects specific Size (e.g., M) and Color (e.g., Black) swatches.<br>3. System verifies real-time inventory availability for that SKU.<br>4. User clicks "Add to Cart".<br>5. Frontend posts data to `POST /api/v1/cart`.<br>6. User navigates to the Cart page to review quantities, update items, or proceed. |
| **Alternate Flow** | User adds item to their Wishlist (`POST /api/v1/wishlist`) for future purchase. |
| **Error Flow** | If selected variant inventory is zero (Out of Stock), the "Add to Cart" button is disabled and stock status indicates "Out of Stock". |
| **Postconditions** | Cart database table and session state reflect the updated item selection and quantities. |
| **Related Requirements** | BR-CAT-02, BR-CRT-01, FR-CAT-02, FR-CRT-01, SCR-CUST-03, SCR-CUST-04 |

### Use Case 4: Order Placement & Fulfillment

| Field | Specification |
| :--- | :--- |
| **Use Case ID** | UC-04 |
| **Use Case Name** | Secure Order Placement & Admin Fulfillment |
| **Primary Actor** | Registered Customer & Store Administrator |
| **Goal** | Complete checkout by providing shipping details, placing the order, and managing fulfillment status. |
| **Preconditions** | Customer has active items in cart and valid authentication session (`SCR-CUST-05`, `SCR-ADMIN-03`). |
| **Trigger** | User clicks "Proceed to Checkout" from the shopping cart page. |
| **Main Flow** | 1. Customer enters shipping address details.<br>2. Customer reviews order summary (items, variant attributes, total price).<br>3. Customer clicks "Place Order" (`POST /api/v1/orders`).<br>4. System creates order record, decrements variant inventory counts atomically, and clears cart.<br>5. Store Admin logs into Admin Dashboard (`SCR-ADMIN-03`), views pending orders (`GET /api/v1/admin/orders`), and updates status to Processing $\rightarrow$ Shipped. |
| **Alternate Flow** | Customer views order history and real-time tracking status in their account portal (`SCR-CUST-06`). |
| **Error Flow** | If inventory becomes depleted during checkout, system aborts order placement and prompts user to adjust cart quantities. |
| **Postconditions** | Order is recorded in MySQL with updated fulfillment status and decremented inventory stock. |
| **Related Requirements** | BR-ORD-01, FR-ORD-01, SCR-CUST-05, SCR-CUST-06, SCR-ADMIN-03 |

---

## 5. User Journeys

### Journey 1: Guest Visitor Journey
1. **User Starting Point:** Lands on the home page (`SCR-CUST-01`) via browser URL.
2. **User Goal:** Explore clothing collections and evaluate product offerings.
3. **Main Steps:** Browses hero promotional banners, selects the "Men" category, and views the catalog listing (`SCR-CUST-02`). Clicks on a specific jacket to view the Product Detail Page (`SCR-CUST-03`).
4. **System Interactions:** Frontend fetches categories and products via FastAPI REST endpoints (`GET /api/v1/categories`, `GET /api/v1/products`).
5. **Possible Error or Alternative Scenarios:** User attempts to add an item to the cart and is prompted to log in or register (subject to guest cart confirmation PBD-02).
6. **Expected Outcome:** User successfully discovers desired clothing items and proceeds to authentication.

### Journey 2: Registered Customer Journey
1. **User Starting Point:** Logs into the platform via Login Screen (`SCR-AUTH-01`).
2. **User Goal:** Purchase a specific clothing item (e.g., Blue T-Shirt, Size L).
3. **Main Steps:** Filters catalog by size and color, selects the item, picks variant attributes on the PDP (`SCR-CUST-03`), adds it to the cart, reviews items in the shopping cart (`SCR-CUST-04`), enters shipping details at checkout (`SCR-CUST-05`), and places the order.
4. **System Interactions:** Backend validates JWT, updates cart sessions, calculates totals, creates order records in MySQL, and decrements variant inventory.
5. **Possible Error or Alternative Scenarios:** Out-of-stock variant encountered; user selects an alternate available color or size.
6. **Expected Outcome** Order is successfully placed, recorded in order history (`SCR-CUST-06`), and ready for store fulfillment.

### Journey 3: Store Administrator Journey
1. **User Starting Point:** Logs into Admin Dashboard (`SCR-ADMIN-01`) with Store Admin credentials (`UR-03`).
2. **User Goal:** Manage product catalog inventory and process incoming customer orders.
3. **Main Steps:** Navigates to Product Management (`SCR-ADMIN-02`) to add/update clothing variants and stock counts. Navigates to Order Fulfillment (`SCR-ADMIN-03`) to review newly placed customer orders and update status from Placed to Processing and Shipped.
4. **System Interactions:** FastAPI enforces RBAC middleware ensuring admin-only API access; SQLAlchemy executes updates against `products`, `product_variants`, `inventory`, and `orders` tables.
5. **Possible Error or Alternative Scenarios:** Admin attempts unauthorized super-admin configuration changes; system blocks action with HTTP 403 Forbidden.
6. **Expected Outcome:** Catalog inventory remains accurate and customer orders are systematically processed toward fulfillment.

---

## 6. Workflow Dependencies

* **Authentication Dependency:** Cart persistence, wishlist management, and order checkout workflows depend entirely on successful user authentication (`UC-01`).
* **Catalog Dependency:** Variant selection and cart management depend on active product catalog and category data (`UC-02`).
* **Inventory Dependency:** Order placement (`UC-04`) depends on accurate stock counts bound to product variants (`UC-03`).

## 7. Error and Alternate Scenarios

* **Session Expiry:** If a customer's JWT expires during checkout, the frontend intercepts the 401 response, caches form state, prompts re-authentication, and resumes checkout.
* **Network Interruption:** Axios interceptors catch connection drops, displaying a retry prompt without destroying local UI state.

## 8. Pending Decisions

* **PBD-02:** Confirmation of guest cart persistence rules (whether guest users can add items to carts before registering).
* **PBD-03:** Payment gateway integration workflow specifics impacting order placement confirmation.

## 9. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature |
| :--- | :--- | :--- | :--- | :--- |
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — |
| *[Pending]* | Senior Product Manager / Technical Lead | **Pending Review** | — | — |
