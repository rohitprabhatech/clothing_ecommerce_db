# Sprint 01: Project Foundation, Authentication & User Management

## A. Sprint Overview
- **Sprint ID**: SPRINT_01
- **Sprint Name**: Project Foundation, Authentication & User Management
- **Duration**: 5 Working Days
- **Business Purpose**: Establish core project infrastructure, secure database connection via SQLAlchemy, implement JWT-based user authentication, Role-Based Access Control (RBAC), and customer address book management.
- **Expected Outcome**: Fully functional user registration, login with JWT tokens, role enforcement (`customer`, `admin`), and address CRUD operations.
- **Dependencies**: Finalized Database Schema.

## B. Database Tasks
- Verify tables: `users`, `roles`, `user_roles`, `user_addresses`.
- Ensure unique index on `users.email` and foreign key cascades (`ON DELETE CASCADE` for `user_roles` and `user_addresses`).
- Seed initial system roles (`customer`, `admin`, `warehouse_manager`) in `roles`.

## C. Backend Development Tasks
1. **Flask App Factory & Configuration**: Initialize Flask app, SQLAlchemy, Flask-JWT-Extended, and CORS.
2. **User Registration API (`POST /api/v1/auth/register`)**: Validate payload via Marshmallow, hash password using `bcrypt`, create user record, and assign default `customer` role in `user_roles`.
3. **User Login API (`POST /api/v1/auth/login`)**: Authenticate email/password, issue JWT access token and refresh token.
4. **RBAC Decorator (`@role_required`)**: Create decorator to restrict endpoints based on user roles stored in `user_roles`.
5. **Address Management CRUD (`/api/v1/users/addresses`)**: Endpoints for customers to add, update, set default, and delete shipping/billing addresses in `user_addresses`.

## D. Frontend Development Tasks
1. **Project Setup**: React.js + Material UI (MUI) configuration, routing setup with React Router v6.
2. **Auth Context & Axios Interceptors**: Create global AuthContext and Axios interceptors to inject `Authorization: Bearer <token>` on requests.
3. **Login & Registration Screens**: Formik + Yup validation for secure sign-in and sign-up.
4. **Address Book Screen**: UI for managing delivery addresses with default address toggle.

## E. API Integration & Communication
- Frontend communicates with `/api/v1/auth/*` and `/api/v1/users/*`.
- Token stored securely in memory / localStorage; 401 unauthorized triggers redirect to login.

## F. Testing & QA
- Unit tests for password hashing and JWT token generation using Pytest.
- Postman collection testing for registration, login, role enforcement, and address CRUD.

## G. Sprint Deliverables
- Initialized Flask backend repository with working auth endpoints.
- React frontend repository with authentication flows and address manager.

## H. Definition of Done (DoD)
- All unit tests pass with >80% code coverage.
- Code reviewed and merged into `main` via Pull Request.

## I. Developer Task Breakdown
- **DB-001**: Verify seed data for `roles` table.
- **BE-001**: Implement JWT login/register and `@role_required` decorator (`users`, `roles`, `user_roles`).
- **BE-002**: Implement user address CRUD endpoints (`user_addresses`).
- **FE-001**: Build Login and Register screens with MUI & Formik.
- **FE-002**: Build Address Book management interface.
- **QA-001**: Test authentication flows and token expiration.
