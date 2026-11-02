# Test Cases & Execution Matrix: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | Functional & Integration Test Cases Specification | 
| **Document ID** | DOC-QA-002 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior QA Engineer | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website

* **Target Technology Stack:** React.js, Python FastAPI, MySQL, SQLAlchemy

* **Document Purpose:** To define executable test cases derived strictly from approved functional requirements, user stories, and acceptance criteria, ensuring full traceability across the project lifecycle.

## 2. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | Senior QA Engineer | Initial creation of the test cases matrix mapped to approved requirements. | 

## 3. Test Cases Matrix

| Test Case ID | Requirement ID | Module | Test Scenario | Preconditions | Test Steps | Expected Result | Priority | Status | 
| ----- | ----- | ----- | ----- | ----- | Dataset seeded; un-registered email. | 1. Navigate to `SCR-AUTH-02`.<br>2. Enter valid name, email, and password.<br>3. Click Submit. | User account created successfully; HTTP 201 response with JWT token. | High | Ready | 
| **TC-AUTH-02** | BR-USR-01, FR-USR-01, API-AUTH-02 | Auth | Verify user login with valid credentials. | User account exists in `users` table. | 1. Navigate to `SCR-AUTH-01`.<br>2. Enter correct email and password.<br>3. Submit login form. | User authenticated successfully; JWT token returned and stored in session. | High | Ready | 
| **TC-AUTH-03** | BR-USR-01, FR-USR-01 | Auth | Verify login failure with invalid password. | User account exists. | 1. Navigate to `SCR-AUTH-01`.<br>2. Enter correct email and incorrect password.<br>3. Submit form. | Login rejected; HTTP 401 Unauthorized returned with error message. | High | Ready | 
| **TC-RBAC-01** | BR-USR-01, API-ADM-01 | RBAC | Verify customer role is blocked from admin endpoints. | User logged in with Customer role (`UR-02`). | 1. Send `GET /api/v1/admin/analytics` using customer JWT. | Request denied; HTTP 403 Forbidden returned. | High | Ready | 
| **TC-CAT-01** | BR-CAT-01, FR-CAT-01, API-CAT-01 | Catalog | Verify hierarchical category tree retrieval. | Categories seeded in database. | 1. Send `GET /api/v1/categories`. | Returns nested list of categories (e.g., Men $\rightarrow$ Tops). | High | Ready | 
| **TC-CAT-02** | BR-CAT-02, FR-CAT-02, API-CAT-02 | Catalog | Verify product filtering by size and color. | Products and variants seeded. | 1. Navigate to `SCR-CUST-02`.<br>2. Apply Size filter (L) and Color filter (Blue). | Catalog displays only products matching selected variant attributes. | High | Ready | 
| **TC-VAR-01** | BR-CAT-02, FR-CAT-02, API-CAT-03 | Product / Inventory | Verify Product Detail Page (PDP) variant stock check. | Product variant has active inventory count > 0. | 1. Navigate to `SCR-CUST-03`.<br>2. Select Size (M) and Color (Black). | Stock status displays "In Stock" and Add to Cart button is enabled. | High | Ready | 
| **TC-CRT-01** | BR-CRT-01, FR-CRT-01, API-CRT-02 | Cart | Verify adding variant item to shopping cart. | User authenticated; variant in stock. | 1. On `SCR-CUST-03`, select variant and click "Add to Cart".<br>2. Navigate to `SCR-CUST-04`. | Item appears in shopping cart with correct quantity and price. | High | Ready | 
| **TC-CRT-02** | BR-CRT-01, FR-CRT-01, API-CRT-03 | Cart | Verify updating cart item quantity or removing item. | Item exists in cart (`SCR-CUST-04`). | 1. Click quantity stepper or delete icon on cart item. | Cart total updates dynamically and item removes successfully. | Medium | Ready | 
| **TC-ORD-01** | BR-ORD-01, FR-ORD-01, API-ORD-01 | Orders | Verify secure order placement and inventory decrement. | Items in cart; shipping address selected (`SCR-CUST-05`). | 1. Navigate to `SCR-CUST-05`.<br>2. Click "Place Order". | Order created in MySQL (`orders`), inventory decremented atomically, cart cleared. | High | Pending Test Detail *(PBD-03)* | 
| **TC-ORD-02** | BR-ORD-01, FR-ORD-01, API-ADM-03 | Orders / Fulfillment | Verify store admin updates order fulfillment status. | Order placed (`order_status = 'Placed'`). | 1. Log in as Store Admin (`UR-03`).<br>2. Navigate to `SCR-ADMIN-03`.<br>3. Update status to 'Shipped'. | Order status updates successfully in database and tracking interface. | High | Ready | 

## 4. Pending Test Details & Assumptions

* **PBD-03 Integration:** Test case `TC-ORD-01` contains pending test details regarding third-party payment gateway callbacks and sandbox transaction verification.

## 5. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *[Pending]* | Senior QA Lead / Test Architect | **Pending Review** | — | — | 
