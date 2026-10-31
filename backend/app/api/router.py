from fastapi import APIRouter, Depends, HTTPException, status
from app.api.v1 import (auth,cart,catalog,categories,orders,payments,users,)
from app.schemas.common import HealthResponse,DatabaseHealthResponse
from sqlalchemy import text
from sqlalchemy.orm import Session
import structlog
from app.core.database import get_db


logger = structlog.get_logger(__name__)

# Primary API Router (version 1)
api_router = APIRouter()


@api_router.get(
    "/health",
    response_model=HealthResponse,
    summary="Service Health Check",
    description="Check the operational health and availability of the Clothing Ecommerce API.",
    tags=["Health"],
)
def get_health() -> HealthResponse:
    """Return backend health status."""
    return HealthResponse(
        status="success",
        message="Clothing Ecommerce API is running",
    )


@api_router.get(
    "/health/database",
    response_model=DatabaseHealthResponse,
    summary="Database Connection Health Check",
    description="Verify active connectivity to the MySQL database by executing a ping query.",
    tags=["Health"],
    responses={
        200: {
            "description": "Database connection is healthy and responsive.",
            "model": DatabaseHealthResponse,
        },
        503: {
            "description": "Database connection failed or database is unreachable.",
        },
    },
)
def get_database_health(db: Session = Depends(get_db)) -> DatabaseHealthResponse:
    """Execute a lightweight query to verify MySQL database connectivity."""
    try:
        # Execute safe SELECT 1 ping query
        result = db.execute(text("SELECT 1")).scalar()
        if result != 1:
            raise Exception("Database ping query returned an unexpected result.")
        return DatabaseHealthResponse(
            status="healthy",
            database_connection="connected",
            database_type="MySQL",
        )
    except Exception as exc:
        # Log error internally for debugging without leaking credentials to client
        logger.error("database_health_check_failed", error=str(exc))
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "unhealthy",
                "database_connection": "disconnected",
                "database_type": "MySQL",
                "message": "Unable to connect to the database. Please verify database availability.",
            },
        )



# Register modular v1 route modules
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(catalog.router)
api_router.include_router(categories.router)
api_router.include_router(cart.router)
api_router.include_router(orders.router)
api_router.include_router(payments.router)

