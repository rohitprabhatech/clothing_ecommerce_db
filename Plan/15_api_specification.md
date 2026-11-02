# API Specification: Clothing E-Commerce Website

| Field | Details |
| :--- | :--- |
| **Document Title** | RESTful API Specification & Endpoints |
| **Document ID** | DOC-ARC-004 |
| **Version** | 1.0 |
| **Status** | Draft / Pending Review |
| **Prepared By** | Senior API Architect & FastAPI Technical Lead |
| **Review Status** | Pending Stakeholder Approval |

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website
* **Target Technology Stack:** Python FastAPI, MySQL, SQLAlchemy ORM
* **Document Purpose:** To define the complete RESTful API contract, endpoint inventory, request/response models, authentication headers, error standards, and query parameters based strictly on approved requirements.

## 2. Revision History

| Version | Date | Author | Description / Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-06-06 | Senior API Architect | Initial comprehensive API specification mapping approved functional requirements and screen APIs. |

## 3. API Design Principles

* **RESTful Architecture:** Utilizing standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) with resource-oriented URI paths.
* **Statelessness:** All requests must be self-contained; session state is managed exclusively via client-provided JSON Web Tokens (JWT).
* **JSON Serialization:** All request payloads and response bodies must be formatted as JSON and validated via FastAPI Pydantic models.

## 4. API Versioning

* **URL Path Versioning:** All endpoints are prefixed with `/api/v1/` to ensure robust backward compatibility for future system iterations.

## 5. Authentication Requirements

* **Bearer Token:** Protected endpoints require a valid JWT passed in the HTTP header: `Authorization: Bearer <token>`.
* **Public Endpoints:** Catalog browsing, category viewing, and authentication (login/register) do not require authentication headers.

## 6. Authorization Requirements

* **Role-Based Access Control (RBAC):** FastAPI dependency injection guards evaluate JWT role claims to restrict administrative operations (`/api/v1/admin/...`) strictly to Store Admins (`UR-03`) and Super Admins (`UR-04`).

## 7. Request Validation

* **Pydantic Validation:** All incoming query parameters, path variables, and JSON bodies are validated at the FastAPI boundary. Invalid payloads trigger automatic HTTP 422 Unprocessable Entity responses.

## 8. Response Standards

* **Standard Success:** Successful operations return HTTP 200 OK or HTTP 201 Created with JSON data bodies. Deletions return HTTP 204 No Content.

## 9. Pagination Requirements

* **Query Parameters:** List endpoints (e.g., product catalog) support `skip` (offset) and `limit` (page size) query parameters to manage result sets efficiently.

## 10. Filtering and Sorting Requirements

* **Filtering:** Catalog endpoints support query parameters for `category_id`, `size`, `color`, and `price_max`.
* **Sorting:** Endpoints support sorting by price (`price_asc`, `price_desc`) or creation date (`newest`).

## 11. Error Response Standards

Standardized JSON error payload returned on exceptions:
```json
{
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "Requested product variant does not exist.",
  "status_code": 404
}
```

## 12. API Security Requirements

* **HTTPS Enforcement:** All API traffic must be encrypted over TLS 1.2+.
* **SQL Injection Defense:** SQLAlchemy ORM parameterized queries prevent SQL injection vulnerabilities.

## 13. API Module Specifications

| API ID | Module | HTTP Method | Endpoint | Purpose | Authentication Required | Request | Response | Error Responses |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **API-AUTH-01** | Authentication | POST | `/api/v1/auth/register` | Register a new customer account. | No | JSON (`email`, `password`, `first_name`, `last_name`) | JSON (`user_id`, `email`, `role`) | 400 (Email taken), 422 (Validation error) |
| **API-AUTH-02** | Authentication | POST | `/api/v1/auth/login` | Authenticate credentials and issue JWT. | No | JSON (`email`, `password`) | JSON (`access_token`, `token_type`) | 401 (Invalid credentials) |
| **API-CAT-01** | Catalog | GET | `/api/v1/categories` | Retrieve hierarchical category tree. | No | None | JSON Array of categories | 500 (Internal error) |
| **API-CAT-02** | Catalog | GET | `/api/v1/products` | Retrieve filtered and paginated clothing products. | No | Query Params (`category_id`, `size`, `color`, `skip`, `limit`) | JSON Array of product summaries | 400 (Invalid filter parameter) |
| **API-CAT-03** | Catalog | GET | `/api/v1/products/{id}` | Retrieve detailed product and variant attributes. | No | Path Param (`id`) | JSON Product & Variant Details | 404 (Product not found) |
| **API-CRT-01** | Cart | GET | `/api/v1/cart` | Retrieve active customer shopping cart. | Yes (Customer) | Header (`Authorization`) | JSON Cart items & total | 401 (Unauthorized), 404 (Cart not found) |
| **API-CRT-02** | Cart | POST | `/api/v1/cart` | Add variant item to shopping cart. | Yes (Customer) | JSON (`variant_id`, `quantity`) | JSON Updated Cart Item | 400 (Out of stock), 404 (Variant not found) |
| **API-CRT-03** | Cart | DELETE | `/api/v1/cart/{item_id}` | Remove item from shopping cart. | Yes (Customer) | Path Param (`item_id`) | HTTP 204 No Content | 404 (Cart item not found) |
| **API-ORD-01** | Orders | POST | `/api/v1/orders` | Place secure order from cart items. | Yes (Customer) | JSON (`address_id`) | JSON Order confirmation (`order_id`, `total_amount`, `status`) | 400 (Cart empty / Stock depleted), 401 |
| **API-ORD-02** | Orders | GET | `/api/v1/orders` | Retrieve customer order history. | Yes (Customer) | Header (`Authorization`) | JSON Array of customer orders | 401 (Unauthorized) |
| **API-ADM-01** | Admin | GET | `/api/v1/admin/analytics` | Retrieve admin dashboard analytics and metrics. | Yes (Store Admin / Super Admin) | Header (`Authorization`) | JSON KPI Summary | 403 (Forbidden - Insufficient Role) |
| **API-ADM-02** | Admin | POST | `/api/v1/admin/products` | Create new clothing product and variants. | Yes (Store Admin / Super Admin) | JSON (`product_name`, `brand`, `base_price`, `variants`) | JSON Created Product Record | 400 (Invalid payload), 403 (Forbidden) |
| **API-ADM-03** | Admin | PUT | `/api/v1/admin/orders/{id}/status` | Update customer order fulfillment status. | Yes (Store Admin / Super Admin) | JSON (`order_status`) | JSON Updated Order Record | 400 (Invalid status transition), 404 |

## 14. Pending Technical Decisions

* **PTD-01:** Final selection of token storage mechanism (httpOnly cookies vs. client-side local storage).
* **Pending API Design Decision:** Confirmation of whether guest visitors are permitted to use cart endpoints prior to registration (Pending PBD-02).

## 15. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature |
| :--- | :--- | :--- | :--- | :--- |
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — |
| *[Pending]* | Senior API Architect / Technical Lead | **Pending Review** | — | — |
