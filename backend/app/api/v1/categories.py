from fastapi import APIRouter

router = APIRouter(prefix="/categories", tags=["Categories"])

# Category hierarchy endpoints (list, nested subcategories) will be registered here.

