from fastapi import APIRouter

router = APIRouter(prefix="/orders", tags=["Orders"])

# Order processing endpoints (create order, order history, track status) will be registered here.

