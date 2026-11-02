# Requirements Traceability Matrix (RTM): Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | End-to-End Requirements Traceability Matrix | 
| **Document ID** | DOC-PLN-003 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior Business Analyst & Project Manager | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website

* **Target Technology Stack:** React.js, Python FastAPI, MySQL, SQLAlchemy

* **Document Purpose:** To establish end-to-end traceability across the project lifecycle, ensuring every Business Requirement links directly to Functional Requirements, User Stories, Database Tables, APIs, Frontend Screens, and Test Cases.

## 2. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | Project Manager / BA | Initial baseline creation of the Requirements Traceability Matrix. | 

## 3. Traceability Approach

The traceability approach follows a strict top-down and bottom-up methodology. Business Objectives drive Business Requirements (`BR-XXX`), which expand into Functional Requirements (`SRS-XXX` / `FR-XXX`), translate into Agile User Stories (`US-XXX`), map to persistent MySQL database entities, expose RESTful APIs (`API-XXX`), render on approved UI/UX Screens (`SCR-XXX`), and validate against QA Test Cases (`TC-XXX`). Where artifacts are pending implementation, they are explicitly tagged.

## 4. Complete Requirements Traceability Matrix

| Business Requirement ID | Functional Requirement ID | User Story ID | Database Table | API ID | Screen ID | Test Case ID | Status | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **BR-DOC-01** | N/A (Charter/Scope) | US-DOC-01 | N/A | N/A | N/A | TC-DOC-01 | **Approved** | 
| **BR-USR-01** | FR-USR-01 | US-AUTH-01, US-AUTH-02 | `users`, `roles` | API-AUTH-01, API-AUTH-02 | SCR-AUTH-01, SCR-AUTH-02 | TC-AUTH-01, TC-AUTH-02 | **Ready** | 
| **BR-CAT-01** | FR-CAT-01 | US-CAT-01, US-CAT-02 | `categories`, `products` | API-CAT-01, API-CAT-02 | SCR-CUST-01, SCR-ADMIN-02 | TC-CAT-01, TC-CAT-02 | **Ready** | 
| **BR-CAT-02** | FR-CAT-02 | US-CAT-03, US-VAR-01, US-VAR-02 | `product_variants`, `product_images`, `inventory` | API-CAT-02, API-CAT-03 | SCR-CUST-02, SCR-CUST-03, SCR-ADMIN-02 | TC-VAR-01, TC-VAR-02 | **Ready** | 
| **BR-CRT-01** | FR-CRT-01 | US-CRT-01, US-CRT-02 | `carts`, `cart_items`, `wishlists`, `wishlist_items` | API-CRT-01, API-CRT-02, API-CRT-03 | SCR-CUST-03, SCR-CUST-04 | TC-CRT-01, TC-CRT-02 | **Ready** | 
| **BR-ORD-01** | FR-ORD-01 | US-ORD-01, US-ORD-02 | `orders`, `order_items`, `user_addresses` | API-ORD-01, API-ORD-02, API-ADM-03 | SCR-CUST-05, SCR-CUST-06, SCR-ADMIN-03 | TC-ORD-01, TC-ORD-02 | **Pending Implementation** *(PBD-03)* | 

## 5. Missing Traceability Items & Pending Items

* **Test Case IDs (`TC-XXX`):** Currently tagged as placeholders pending formal QA Test Strategy document creation (`15_testing_and_qa.md`).

* **PBD-03 Integration:** Order placement (`API-ORD-01` / `US-ORD-01`) is pending final payment gateway decision confirmation.

## 6. Change Impact Analysis Process

When a change request (CR) is submitted:
1. The PM/BA identifies the affected Business Requirement in this matrix.
2. Tracing downstream reveals all impacted Functional Requirements, User Stories, Database Tables, APIs, Screens, and Test Cases.
3. Impact severity is evaluated prior to formal Project Sponsor sign-off.

## 7. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *[Pending]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *[Pending]* | Senior Project Manager / BA | **Pending Review** | — | — | 
