# Backend API Implementation Tracker

| API ID | Module | Endpoint | Method | Auth Required | Required Role | Request Schema | Response Schema | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `API-AUT-01` | Auth | `/api/v1/auth/register` | POST | No | Public | `UserRegisterSchema` | `UserResponseSchema` | Pending |
| `API-AUT-02` | Auth | `/api/v1/auth/login` | POST | No | Public | `UserLoginSchema` | `TokenResponseSchema` | Pending |
| `API-CAT-01` | Catalog | `/api/v1/categories` | GET | No | Public | None | `CategoryTreeSchema` | Pending |
| `API-PRD-01` | Products | `/api/v1/products` | GET | No | Public | Query Params | `ProductListSchema` | Pending |
| `API-CRT-01` | Cart | `/api/v1/cart` | GET | Optional | Customer / Guest | None | `CartResponseSchema` | Pending |
| `API-ORD-01` | Orders | `/api/v1/orders` | POST | Yes | Customer | `OrderCreateSchema` | `OrderResponseSchema` | Pending |
