# Project Glossary: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | Project Glossary & Common Terminology Specification | 
| **Document ID** | DOC-PLN-005 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | Senior Business Analyst & Technical Documentation Specialist | 
| **Review Status** | Pending Stakeholder Approval | 
| **Last Updated** | [YYYY-MM-DD] | 

## 1. Revision History

| Version | Date | Description of Changes | Prepared By | Review Status | 
| ----- | ----- | ----- | ----- | ----- | 
| 1.0 | [YYYY-MM-DD] | Initial creation of the project glossary based on confirmed requirements and tech stack. | Business Analyst | Pending Review | 

## 3. Purpose

The purpose of the Project Glossary is to establish a single source of truth for common business, technical, project management, and database terminology used throughout the Clothing E-Commerce Website project. This document ensures clear, unambiguous communication among project stakeholders, developers, QA engineers, and project management by providing standardized definitions for all core concepts.

## 4. Glossary Terms

### Business and E-Commerce Terms

| Term | Category | Definition | Related Module or Document | 
| ----- | ----- | ----- | ----- | 
| **Customer** | Business | A registered user who browses the catalog, manages a shopping cart/wishlist, and places order transactions. | `PROJECT_CHARTER.md`, `SRS` | 
| **Product** | Business | A master clothing item listed in the store catalog (e.g., shirts, trousers, jackets) featuring a brand and base description. | `Database Schema`, `SRS` | 
| **Category** | Business | A hierarchical classification grouping clothing items into departments (e.g., Men $\rightarrow$ Tops). | `Database Schema`, `SRS` | 
| **Product Variant** | Business | A specific physical SKU iteration of a product defined by attributes such as size, color, and material. | `Database Schema`, `SRS` | 
| **Shopping Cart** | Business | A temporary container holding selected product variants chosen by a customer prior to checkout. | `SRS`, `API Specification` | 
| **Wishlist** | Business | A container allowing registered customers to save product variants for future purchase consideration. | `SRS`, `API Specification` | 
| **Order** | Business | A formal record representing a completed checkout transaction, including total pricing and fulfillment status. | `Database Schema`, `SRS` | 
| **Order Item** | Business | An individual line item captured within an order, recording immutable variant pricing and quantity snapshots at purchase time. | `Database Schema`, `Data Dictionary` | 
| **Offer** | Business (Pending) | Promotional pricing or bundle incentive. | *Pending Business Decision (PBD)* | 
| **Discount** | Business (Pending) | Promotional voucher or coupon code reducing order totals. | *Pending Business Decision (PBD)* | 
| **Advertisement** | Business (Pending) | Marketing promotional banners or visual displays. | *Future Enhancement* | 
| **Payment** | Business (Pending) | Financial transaction processing via external gateways. | *Pending Business Decision (PBD-03)* | 
| **Shipment** | Business (Pending) | Fulfillment and courier delivery tracking for placed orders. | *Pending Business Decision (PBD)* | 
| **Delivery** | Business (Pending) | Final receipt of goods by the customer. | *Pending Business Decision (PBD)* | 
| **Order Tracking** | Business (Pending) | Milestone visibility of order transit status. | *Pending Business Decision (PBD)* | 
| **Return** | Business (Pending) | Processing of customer apparel return and refund requests. | *Pending Business Decision (PBD-05)* | 
| **Refund** | Business (Pending) | Reversal of funds associated with returned or cancelled orders. | *Pending Business Decision (PBD-05)* | 
| **Review** | Business (Pending) | Customer star ratings and text feedback on clothing items. | *Future Enhancement* | 
| **Rating** | Business (Pending) | Numerical scoring assigned to products by customers. | *Future Enhancement* | 

### User and Access Terms

| Term | Category | Definition | Related Module or Document | 
| ----- | ----- | ----- | ----- | 
| **User** | User & Access | Any individual interacting with the system, whether unauthenticated or authenticated. | `SRS`, `Database Schema` | 
| **User Role** | User & Access | A defined classification of privileges (Guest Visitor, Registered Customer, Store Admin, Super Admin) governing system access. | `SRS`, `Backend Architecture` | 
| **Authentication** | User & Access | The process of verifying a user's identity via credentials (email and password) to issue a secure JWT. | `Security Requirements`, `API Specification` | 
| **Authorization** | User & Access | The process of verifying whether an authenticated user has the necessary role permissions to access specific resources or APIs. | `Security Requirements`, `Backend Architecture` | 
| **Permission** | User & Access | Specific access rights granted to a user role (e.g., create product, place order). | `SRS`, `RBAC Matrix` | 
| **Administrator** | User & Access | An umbrella term for Store Admins and Super Admins responsible for managing catalog inventory and order fulfillment. | `SRS`, `UI/UX Requirements` | 

### Technical Terms

| Term | Category | Definition | Related Module or Document | 
| ----- | ----- | ----- | ----- | 
| **React.js** | Technical | The approved frontend component-driven JavaScript library used to build the Single Page Application (SPA). | `Frontend Architecture`, `PROJECT_CHARTER.md` | 
| **FastAPI** | Technical | The approved high-performance Python web framework used to construct the backend REST API. | `Backend Architecture`, `PROJECT_CHARTER.md` | 
| **MySQL** | Technical | The approved relational database management system storing all persistent operational data. | `Database Schema`, `PROJECT_CHARTER.md` | 
| **SQLAlchemy** | Technical | The approved Python Object-Relational Mapper (ORM) used to map database tables to Python classes. | `Database Schema`, `Backend Architecture` | 
| **REST API** | Technical | The architectural style used for communication between the React frontend and FastAPI backend via HTTP methods. | `API Specification` | 
| **API Endpoint** | Technical | A specific URI path exposed by the backend to handle client requests. | `API Specification` | 
| **Database** | Technical | The structured collection of tables managed by MySQL. | `Database Schema`, `Data Dictionary` | 
| **ORM** | Technical | A programming technique bridging object-oriented code and relational databases (SQLAlchemy). | `Backend Architecture`, `Development Standards` | 
| **Frontend** | Technical | The client-side React application rendered in user browsers. | `Frontend Architecture` | 
| **Backend** | Technical | The server-side FastAPI application executing business logic and database persistence. | `Backend Architecture` | 

### Project Management Terms

| Term | Category | Definition | Related Module or Document | 
| ----- | ----- | ----- | ----- | 
| **Requirement** | Project Management | A documented condition or capability needed by a stakeholder to solve a problem or achieve an objective. | `BRD`, `SRS` | 
| **Business Requirement** | Project Management | High-level goals establishing mandatory store capabilities (`BR-XXX`). | `Business Requirements` | 
| **Functional Requirement** | Project Management | Detailed system behaviors and feature rules (`FR-XXX`). | `Software Requirements Specification` | 
| **Non-Functional Requirement** | Project Management | System quality attributes covering performance, security, and scalability (`NFR-XXX`). | `Software Requirements Specification` | 
| **User Story** | Project Management | An agile requirement description written from an end-user perspective (`US-XXX`). | `Product Backlog` | 
| **Epic** | Project Management | A large body of work broken down into smaller user stories. | `Product Backlog` | 
| **Product Backlog** | Project Management | The prioritized master list of all approved user stories and tasks. | `Product Backlog` | 
| **Sprint** | Project Management | A time-boxed iteration (e.g., 2 weeks) dedicated to delivering a usable increment of work. | `Sprint Roadmap` | 
| **Acceptance Criteria** | Project Management | Conditions that a user story must satisfy to be considered complete by stakeholders. | `Product Backlog`, `SRS` | 
| **Definition of Ready (DoR)** | Project Management | Criteria required before a user story can be accepted into a sprint. | `Development Standards` | 
| **Definition of Done (DoD)** | Project Management | Criteria required for a user story to be marked as fully completed and tested. | `Development Standards`, `Test Strategy` | 
| **Defect** | Project Management | A software bug or deviation from expected requirements. | `Bug & Defect Management` | 
| **Test Case** | Project Management | A documented set of conditions and steps used to verify system behavior against requirements (`TC-XXX`). | `Test Cases` | 

### Database Terms

| Term | Category | Definition | Related Module or Document | 
| ----- | ----- | ----- | ----- | 
| **Table** | Database | A structured collection of data rows and columns within MySQL. | `Database Schema`, `Data Dictionary` | 
| **Primary Key** | Database | A column or set of columns uniquely identifying each row in a table (`PK`). | `Database Schema`, `Data Dictionary` | 
| **Foreign Key** | Database | A column establishing a link between data in two tables (`FK`). | `Database Schema`, `ERD Specification` | 
| **Relationship** | Database | The association between two database entities (One-to-Many, Many-to-Many, etc.). | `ERD Specification` | 
| **Entity** | Database | A distinct business object represented as a table in the database. | `Database Schema`, `ERD Specification` | 
| **Data Dictionary** | Database | A comprehensive specification of all database tables, columns, data types, and constraints. | `Data Dictionary` | 
| **ERD** | Database | Entity Relationship Diagram visualizing the relational database schema topology. | `ERD Specification` | 

## 5. Abbreviations and Acronyms

| Abbreviation | Full Form | Definition or Usage | 
| ----- | ----- | ----- | 
| **API** | Application Programming Interface | Defines how the frontend interacts with backend services. | 
| **UI** | User Interface | The visual graphical elements presented to users in React. | 
| **UX** | User Experience | The overall interaction quality and flow experienced by store visitors. | 
| **DB** | Database | Refers to the MySQL relational database instance. | 
| **ORM** | Object-Relational Mapper | SQLAlchemy mapping layer connecting Python objects to MySQL. | 
| **ERD** | Entity Relationship Diagram | Visual representation of database tables and relationships. | 
| **SRS** | Software Requirements Specification | Comprehensive document defining functional system behaviors. | 
| **QA** | Quality Assurance | Independent verification and testing of software artifacts. | 

## 6. Naming and Terminology Rules

* **Consistency:** Use exactly one approved name for the same business entity across documentation, code, and UI labels (e.g., always use `Product Variant` rather than mixing "SKU" or "Item Size Variant" interchangeably in customer-facing specs).
* **Avoid Duplication:** Do not introduce synonyms for established concepts unless a precise business distinction exists.
* **Glossary Updates:** Whenever new confirmed terminology is introduced through approved scope changes, this glossary must be updated via a pull request.

## 7. Pending or Proposed Terms

| Term | Status | Reason | Required Decision | 
| ----- | ----- | ----- | ----- | 
| **Payment Gateway** | Pending Business Decision | Third-party payment integration provider unconfirmed. | *Pending Business Decision (PBD-03)* | 
| **Coupon / Discount Code** | Proposed | Promotional discount engine deferred to future release phase. | *Future Enhancement Approval* | 
| **Product Review** | Proposed | Customer rating system deferred to post-MVP phase. | *Future Enhancement Approval* | 

## 8. Glossary Maintenance Process

1. **Identification:** When new terms emerge from approved requirements or architectural decisions, the Business Analyst flags them.
2. **Review:** The technical lead and product owner review the proposed term definition against existing nomenclature.
3. **Integration:** Upon approval, the term is added to the glossary markdown file in the appropriate category under version control.

## 9. Approval Section

| Reviewer Role | Name | Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| **Prepared By** | Business Analyst | Pending Review | — | — | 
| **Reviewed By** | Technical Lead | Pending Review | — | — | 
| **Approved By** | Project Sponsor | Pending Approval | — | — | 
