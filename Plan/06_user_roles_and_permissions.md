# User Roles and Permissions Specification: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | User Roles and Permissions Document | 
| **Document ID** | DOC-REQ-003 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior Business Analyst & Software Architect | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website

* **Target Technology Stack:** React.js (Frontend), Python FastAPI (Backend), MySQL (Database), SQLAlchemy (ORM)

* **Document Purpose:** To define the role-based access control (RBAC) matrix, permissions, restrictions, and security boundaries for all user types interacting with the clothing e-commerce platform.

## 2. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | Senior Business Analyst & Software Architect | Initial draft establishing user roles and permissions based on approved SRS and Project Scope. | 

## 3. Role Overview

The system enforces role-based access control (RBAC) to ensure that users only access functionality and data corresponding to their assigned permissions. Based on approved project requirements, four primary user roles are defined within the system architecture.

## 4. Permission Model

The permission model relies on JSON Web Tokens (JWT) issued by the FastAPI backend upon successful authentication. Each JWT embeds user role claims. FastAPI dependency injection middleware inspects these claims to authorize or forbid incoming API requests.

## 5. Role and Module Access Matrix

| Role ID | Role Name | Purpose | Permissions | Restrictions | Related Requirements | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **UR-01** | Guest Visitor | To browse the clothing catalog and view product information without logging in. | View public home page, browse categories, view product listings and product detail pages (PDP). | Cannot add items to cart/wishlist (Pending Business Decision), cannot place orders, cannot access administrative dashboards. | BR-USR-01, FR-USR-01, SCR-CUST-01, SCR-CUST-02, SCR-CUST-03 | 
| **UR-02** | Registered Customer | To manage personal account details, shopping cart, wishlist, and place orders. | All Guest permissions, manage profile, persist shopping cart & wishlist, place secure orders, view order tracking. | Cannot modify product catalog, cannot access admin analytics or inventory management. | BR-USR-01, BR-CRT-01, BR-ORD-01, FR-USR-01, FR-CRT-01, FR-ORD-01 | 
| **UR-03** | Store / Content Admin | To manage clothing products, variants, categories, inventory stock levels, and order fulfillment. | Manage categories, manage product variants & SKUs, adjust inventory counts, update order fulfillment status. | Cannot modify super admin system configurations or manage user roles. | BR-CAT-01, BR-CAT-02, BR-ORD-01, FR-CAT-01, FR-CAT-02, FR-ORD-01 | 
| **UR-04** | Super Admin | To maintain absolute control over system configurations, user role assignments, and platform analytics. | Full administrative control, user role management, system analytics overview, security audit log access. | None within system boundaries. | BR-USR-01, BO-03, FR-USR-01 | 

## 6. Authentication Requirements

* **Credentials:** Users must authenticate using a unique email address and secure password.

* **Password Security:** Passwords must be hashed using bcrypt via SQLAlchemy models before storage in the MySQL database.

* **Token Issuance:** Successful authentication issues a short-lived JWT containing user ID and role claims.

## 7. Authorization Requirements

* **API Endpoint Guards:** FastAPI backend routes must utilize dependency injection wrappers to evaluate JWT claims against required role permissions.

* **HTTP Status Responses:** Unauthenticated requests must return `401 Unauthorized`; unauthorized role requests must return `403 Forbidden`.

## 8. Restricted Actions

* Guest visitors are strictly restricted from initiating checkouts or accessing customer portals.

* Registered customers are strictly restricted from accessing administrative screens (`SCR-ADMIN-01`, `SCR-ADMIN-02`, `SCR-ADMIN-03`).

* Store admins are restricted from altering super-admin configurations and user role assignments.

## 9. Role-Based Security Considerations

* **Privilege Escalation Prevention:** Backend validation prevents users from elevating their role claims via client-side manipulation.

* **Session Invalidation:** Token expiration policies and secure logout flows ensure abandoned sessions are terminated.

## 10. Pending Decisions

* **PBD-02:** **Pending Business Decision:** Confirmation of whether guest visitors are allowed to add items to shopping carts prior to registration.

* **PTD-01:** **Pending Technical Decision:** Selection of token storage mechanism (secure httpOnly cookies vs. client local storage).

## 11. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *\[Pending\]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *\[Pending\]* | Senior Software Architect / Technical Lead | **Pending Review** | — | — | 
