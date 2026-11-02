from fastapi import APIRouter

router = APIRouter(prefix="/catalog", tags=["Catalog"])

# Catalog & Product endpoints (search, filter, product details, stock) will be registered here.

