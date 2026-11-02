# Clothing E-Commerce Frontend

A modern, high-performance, responsive single-page application (SPA) frontend for a contemporary Clothing E-Commerce platform built with **React.js**, **Vite**, **JavaScript**, and **React Router DOM**.

---

## Technology Stack

- **Framework:** React.js 18.3
- **Build Tool & Dev Server:** Vite 5.x
- **Language:** JavaScript (ES2020+)
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios (with dynamic baseURL, JWT interceptors, and centralized error handling)
- **Code Quality & Linting:** ESLint 9+ (Flat config with React and React Hooks rules)
- **Styling:** Custom responsive CSS design system with CSS custom properties (`main.css`)

---

## Project Folder Structure

```text
front-end/
│
├── public/
│   └── vite.svg                      # Static assets & favicon
│
├── src/
│   ├── assets/                       # Static media and global styling
│   │   ├── icons/                    # SVG / icon assets
│   │   ├── images/                   # Product and branding imagery
│   │   └── styles/
│   │       └── main.css              # Global styles, CSS variables, resets, and UI classes
│   │
│   ├── components/                   # Modular UI components
│   │   ├── common/                   # Reusable generic UI elements
│   │   │   ├── Button.jsx            # Multi-variant button (primary, secondary, outline, danger)
│   │   │   ├── Input.jsx             # Form input with label and error display
│   │   │   ├── Loader.jsx            # Accessible loading spinner
│   │   │   ├── Modal.jsx             # Accessible modal dialog with backdrop
│   │   │   └── index.js
│   │   │
│   │   ├── layout/                   # Application shell components
│   │   │   ├── Header.jsx            # Site header with branding, cart badge, and auth links
│   │   │   ├── Navigation.jsx        # Category navigation bar
│   │   │   ├── Footer.jsx            # Multi-column footer and copyright
│   │   │   ├── Layout.jsx            # Primary shell wrapping Header, Nav, Outlet, Footer
│   │   │   └── index.js
│   │   │
│   │   └── product/                  # Domain-specific apparel components
│   │       ├── ProductCard.jsx       # Catalog apparel card with price & INR formatting
│   │       ├── SizeSelector.jsx      # Reusable apparel size picker (XS, S, M, L, XL, etc.)
│   │       ├── VariantSwatch.jsx     # Color / fabric swatch picker
│   │       └── index.js
│   │
│   ├── context/                      # Global state management
│   │   ├── AuthContext.jsx           # Authentication state (user, token, login, logout stubs)
│   │   ├── CartContext.jsx           # Shopping cart state (items, quantity, total amount)
│   │   └── index.js
│   │
│   ├── hooks/                        # Custom reusable React hooks
│   │   ├── useAuth.js                # Hook to consume AuthContext safely
│   │   ├── useCart.js                # Hook to consume CartContext safely
│   │   ├── useFetch.js               # Generic async data fetching hook with refetch
│   │   └── index.js
│   │
│   ├── pages/                        # Top-level route views
│   │   ├── HomePage.jsx              # Welcome banner and feature overview
│   │   ├── LoginPage.jsx             # Customer sign-in container
│   │   ├── RegisterPage.jsx          # New customer registration container
│   │   ├── ProductListPage.jsx       # Catalog grid container
│   │   ├── ProductDetailPage.jsx     # Dynamic single product view (/products/:id)
│   │   ├── CartPage.jsx              # Shopping cart summary and item management
│   │   ├── CheckoutPage.jsx          # Order checkout placeholder container
│   │   ├── NotFoundPage.jsx          # 404 error page
│   │   └── index.js
│   │
│   ├── services/                     # Backend communication layer
│   │   ├── api_client.js             # Configured Axios client with interceptors
│   │   ├── catalog_api.js            # Catalog endpoint functions (getProducts, getProductById, etc.)
│   │   └── index.js
│   │
│   ├── utils/                        # Shared utility functions
│   │   ├── currency.js               # INR currency formatting (Intl.NumberFormat)
│   │   ├── validation.js             # Form validation helpers (email, phone, pin code, password)
│   │   └── index.js
│   │
│   ├── App.jsx                       # Root application component with router configuration
│   └── main.jsx                      # Vite React DOM entrypoint
│
├── .env                              # Local environment variables (DO NOT COMMIT)
├── .env.example                      # Template for environment variables
├── .gitignore                        # Git exclusion rules
├── eslint.config.js                  # ESLint 9+ flat configuration
├── index.html                        # HTML5 document template
├── package.json                      # Dependencies and npm scripts
├── vite.config.js                    # Vite configuration and path aliases
└── README.md                         # Frontend documentation
```

---

## Configured Routes

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Brand showcase, quick links, and API health target |
| `/login` | `LoginPage` | User login form container |
| `/register` | `RegisterPage` | Customer registration container |
| `/products` | `ProductListPage` | Apparel catalog grid with product cards |
| `/products/:id` | `ProductDetailPage` | Dynamic single apparel item with color & size selector |
| `/cart` | `CartPage` | Shopping cart with quantity adjustment and INR totals |
| `/checkout` | `CheckoutPage` | Order summary and checkout workflow foundation |
| `*` | `NotFoundPage` | 404 page for unmatched routes |

---

## Windows Setup Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (Verified with Node.js v22.20.0)
- **npm:** v9.0.0 or higher (Verified with npm v10.9.2)

### Step 1: Open Windows Command Prompt (`cmd.exe`) & Navigate to Project

```cmd
cd /d C:\PrabhaTech\Projects\Clothing_Ecommerce_Web\front-end
```

### Step 2: Install Node Dependencies

```
npm install
```

### Step 3: Configure Environment Variables

Create your local `.env` file from the example template:

```cmd
copy .env.example .env
```

Ensure `VITE_API_BASE_URL` points to your running FastAPI backend:

```ini
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### Step 4: Run Development Server

```cmd
npm run dev
```

Open your browser at: **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

### Step 5: Check Linting & Code Quality

```cmd
npm run lint
```

### Step 6: Build for Production

```cmd
npm run build
```

The optimized production bundle will be created inside the `dist/` directory.

---

## Backend Integration Architecture

The frontend uses a centralized Axios client in `src/services/api_client.js`:

- **Environment Driven:** Reads exclusively from `import.meta.env.VITE_API_BASE_URL`.
- **JWT Authorization:** Automatically injects `Authorization: Bearer <token>` from `localStorage` on outgoing requests.
- **Error Normalization:** Converts network and HTTP errors into a predictable `{ status, code, message, details }` structure.
- **FastAPI Alignment:** Matches backend endpoints (`/catalog`, `/categories`, `/health`, `/auth`).
