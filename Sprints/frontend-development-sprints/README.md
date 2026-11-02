# Prabha Technology - Clothing E-Commerce Website: Frontend Development Sprint Package

## 1. Overview & Architecture
This package contains the comprehensive, enterprise-grade Frontend Development Sprint Documentation for the **Clothing E-Commerce Website**. The frontend is built on **React.js** using functional components, hooks, **Material UI (MUI v5)**, **React Router v6**, and **Axios** for REST API integration with the FastAPI backend.

As the Frontend Developer, your sole responsibility is building the client-side user experience, components, state management, form validations, and backend API integration as specified in these sprint guides. Backend logic, database tables, and FastAPI routes are independently managed by the backend engineering team.

---

## 2. Frontend Sprint Index & Sequence

| Sprint ID | Sprint Name | Duration | Core Focus & Deliverables |
| :--- | :--- | :--- | :--- |
| **FE_SPRINT_01** | Project Setup & Configuration | 3 Days | React CLI initialization, MUI v5 theme setup, Axios client config, Router setup |
| **FE_SPRINT_02** | Design System & Reusable Components | 4 Days | Buttons, Cards, Modals, Form inputs, Notification snackbars, Layout headers/footers |
| **FE_SPRINT_03** | Authentication & RBAC UIs | 4 Days | Login, Registration, JWT token interceptors, Protected Route wrappers |
| **FE_SPRINT_04** | Customer Profile & Address Book | 3 Days | User profile management, Shipping/billing address CRUD, Default address toggle |
| **FE_SPRINT_05** | Home Page & Global Navigation | 4 Days | Hero banner carousel (`advertisements`), Featured categories, Mega-menu header |
| **FE_SPRINT_06** | Product Catalog & Listing (PLP) | 5 Days | Product grid, sidebar filters (Size, Color hex swatches, Price range, Fit type), pagination |
| **FE_SPRINT_07** | Product Detail Page (PDP) | 4 Days | Image gallery tied to color variants, size selector, Size Chart modal, stock availability |
| **FE_SPRINT_08** | Shopping Cart & Wishlist | 4 Days | Slide-out Cart Drawer, Cart page quantity controls, Wishlist toggle & grid |
| **FE_SPRINT_09** | Multi-Step Checkout & Address Selection | 5 Days | Address selector, GST tax & coupon application, payment method selection (Prepaid/COD) |
| **FE_SPRINT_10** | Payment Gateway Integration UI | 3 Days | Razorpay/Cashfree SDK popup integration, Order success confirmation screen |
| **FE_SPRINT_11** | Order History & Shipment Tracking | 4 Days | Order history table, status badges, AWB shipment tracking timeline modal |
| **FE_SPRINT_12** | Item-Level Returns & Size Exchanges | 4 Days | Garment return/exchange request modal, reason dropdown, exchange variant selector |
| **FE_SPRINT_13** | Verified Reviews with Fit Feedback & Photos | 4 Days | Star rating widget, fit feedback selector (`TRUE_TO_SIZE`), photo upload component |
| **FE_SPRINT_14** | Admin Dashboard & Management UI | 6 Days | Admin layout, sales charts, product/inventory grid, order fulfillment & return QC panels |
| **FE_SPRINT_15** | Frontend Testing, Optimization & Release | 4 Days | React Testing Library component tests, accessibility audit, production bundling |

---

## 3. Integration & Coding Standards
- **API Base URL**: Configured via environment variables (`REACT_APP_API_BASE_URL`).
- **State Management**: React Context API (`AuthContext`, `CartContext`) combined with local component state.
- **Form Validation**: Formik + Yup schemas matching backend validation rules.
- **Error Handling**: Axios response interceptors handling 401 unauthorized (token refresh/logout) and global error snackbars.
