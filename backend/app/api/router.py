from fastapi import APIRouter
from app.api.v1 import (
    auth,
    cart,
    catalog,
    categories,
    orders,
    payments,
    users,
)
from app.schemas.common import HealthResponse

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


# Register modular v1 route modules
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(catalog.router)
api_router.include_router(categories.router)
api_router.include_router(cart.router)
api_router.include_router(orders.router)
api_router.include_router(payments.router)

