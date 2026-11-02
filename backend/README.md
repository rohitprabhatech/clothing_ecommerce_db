# Clothing E-Commerce Backend

A robust, enterprise-grade RESTful API backend for a modern Clothing E-Commerce platform built with **Python 3.12+**, **FastAPI**, **SQLAlchemy 2.0**, and **MySQL**.

---

## Technology Stack

- **Language:** Python 3.12+ (tested & verified on Python 3.14.3)
- **Web Framework:** FastAPI (with Uvicorn ASGI server)
- **Database & ORM:** MySQL 8.0+ / MySQL 9.x with SQLAlchemy 2.0 and PyMySQL driver
- **Schema & Validation:** Pydantic v2 & Pydantic-Settings
- **Database Migrations:** Alembic
- **Authentication & Security:** JWT (JSON Web Tokens via `python-jose`) and Argon2 password hashing (`pwdlib[argon2]`)
- **Structured Logging:** `structlog` with JSON output in production and colored human-readable console in development
- **Testing:** Pytest, HTTPX (TestClient), and Pytest-Cov

---

## Project Directory Structure

```text
backend/
├── alembic/                      # Alembic database migration scripts
│   ├── versions/                 # Individual version migration scripts
│   ├── env.py                    # Alembic runtime environment (dynamic DB URL loading)
│   ├── script.py.mako            # Migration template
│   └── README                    # Alembic documentation
│
├── app/
│   ├── api/                      # Presentation layer (HTTP routes & controllers)
│   │   ├── v1/                   # API Version 1 modular routers
│   │   │   ├── auth.py           # Authentication routes (login, register, refresh)
│   │   │   ├── users.py          # User management routes
│   │   │   ├── catalog.py        # Product catalog & inventory routes
│   │   │   ├── categories.py     # Category navigation routes
│   │   │   ├── cart.py           # Shopping cart operations
│   │   │   ├── orders.py         # Checkout & order processing
│   │   │   ├── payments.py       # Payment processing & webhook callbacks
│   │   │   └── __init__.py
│   │   ├── router.py             # Root v1 router & health endpoint
│   │   └── __init__.py
│   │
│   ├── core/                     # Application foundation & infrastructure
│   │   ├── config.py             # Pydantic-Settings environment configuration
│   │   ├── database.py           # SQLAlchemy 2.0 engine, SessionLocal, get_db
│   │   ├── security.py           # Argon2 password hashing & JWT token handling
│   │   ├── exceptions.py         # Custom domain exceptions & global handlers
│   │   ├── logging.py            # Structlog configuration & HTTP request logger
│   │   └── __init__.py
│   │
│   ├── models/                   # SQLAlchemy 2.0 Declarative ORM models
│   │   ├── base.py               # Base class, IDMixin, TimestampMixin
│   │   └── __init__.py
│   │
│   ├── schemas/                  # Pydantic v2 data validation schemas
│   │   ├── common.py             # Standard APIResponse, PaginatedResponse, Health
│   │   └── __init__.py
│   │
│   ├── repositories/             # Data Access layer (Generic CRUD)
│   │   ├── base.py               # BaseRepository generic implementation
│   │   └── __init__.py
│   │
│   ├── services/                 # Domain business logic layer
│   │   ├── base.py               # BaseService generic orchestration
│   │   └── __init__.py
│   │
│   ├── utils/                    # Shared helper utilities
│   │   ├── helpers.py            # Slugify, pagination calculation, formatting
│   │   └── __init__.py
│   │
│   └── main.py                   # FastAPI application initialization & middleware
│
├── tests/                        # Automated test suite
│   ├── unit/                     # Unit tests (security, config, schemas, crud, utils)
│   │   ├── test_config.py
│   │   ├── test_crud_base.py
│   │   ├── test_exceptions.py
│   │   ├── test_schemas.py
│   │   ├── test_security.py
│   │   ├── test_utils.py
│   │   └── __init__.py
│   ├── integration/              # Integration tests (health endpoint, documentation)
│   │   ├── test_health.py
│   │   └── __init__.py
│   ├── conftest.py               # Shared test fixtures & TestClient configuration
│   └── __init__.py
│
├── .env                          # Local environment variables (DO NOT COMMIT)
├── .env.example                  # Template of required environment variables
├── .gitignore                    # Git exclusions
├── requirements.txt              # Production & development dependencies
├── pyproject.toml                # Project metadata & Pytest configuration
├── alembic.ini                   # Alembic configuration
└── README.md                     # Documentation & setup guide
```

---

## Architectural Principles

1. **Separation of Concerns (Clean Layered Architecture):**
   - **API Layer (`app/api`):** Handles HTTP requests, parameter validation, and status codes.
   - **Service Layer (`app/services`):** Coordinates business rules, validation workflows, and transactions.
   - **Repository Layer (`app/repositories`):** Abstract data access logic using SQLAlchemy 2.0 query patterns.
   - **Model Layer (`app/models`):** Database schemas and relationships with automatic timestamps.
   - **Schema Layer (`app/schemas`):** Type-safe request/response validation models via Pydantic v2.

2. **Security-First Approach:**
   - Password hashing uses modern **Argon2** via `pwdlib`.
   - Token authentication uses cryptographic **JWT (HS256)** with expiration controls.
   - No credentials or secrets are ever hardcoded; all configuration is driven by `.env`.
   - Sensitive `.env` is ignored by Git (`.gitignore`).

---

## Windows Command Prompt (CMD) Setup Instructions

Follow these exact steps to set up and run the backend on **Windows Command Prompt (`cmd.exe`)**:

### Step 1: Open Windows Command Prompt & Navigate to Project Directory

```cmd
cd /d C:\PrabhaTech\Projects\Clothing_Ecommerce_Web\backend
```

### Step 2: Create a Virtual Environment

```cmd
python -m venv venv
```

### Step 3: Activate the Virtual Environment

```cmd
venv\Scripts\activate.bat
```

*(Your command prompt will now show `(venv)` at the beginning of the line).*

### Step 4: Upgrade pip & Install Dependencies

```cmd
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Create your local `.env` file by copying the provided example:

```cmd
copy .env.example .env
```

Open `.env` in Notepad or your editor and adjust your MySQL settings:

```cmd
notepad .env
```

Ensure the following variables match your local MySQL configuration:

```ini
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=clothing_ecommerce
```

### Step 6: Create MySQL Database

In MySQL CLI or MySQL Workbench, create the database:

```sql
CREATE DATABASE IF NOT EXISTS clothing_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 7: Run Alembic Database Migrations

Apply the migration history to your database:

```cmd
alembic upgrade head
```

To create new migration revisions in the future:

```cmd
alembic revision --autogenerate -m "create_initial_tables"
```

### Step 8: Start the FastAPI Development Server

```cmd
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

---

## Interactive Documentation & Endpoints

Once the server is running, open your web browser:

- **Swagger UI (Interactive API Docs):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc (Alternative API Documentation):** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **OpenAPI Schema (JSON):** [http://127.0.0.1:8000/api/v1/openapi.json](http://127.0.0.1:8000/api/v1/openapi.json)
- **Health Check Endpoint:** [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)

### Health Check Response

`GET /api/v1/health`

```json
{
  "status": "success",
  "message": "Clothing Ecommerce API is running"
}
```

---

## Running the Automated Test Suite

Run tests with verbose output:

```cmd
pytest -v
```

Run tests with test coverage report:

```cmd
pytest --cov=app --cov-report=term-missing
```
