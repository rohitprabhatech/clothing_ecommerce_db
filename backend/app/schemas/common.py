from typing import Any, Generic, Optional, TypeVar
from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class BaseSchema(BaseModel):
    """Base Pydantic model with modern v2 configuration."""

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class HealthResponse(BaseModel):
    """Health check endpoint response schema."""

    status: str = Field(default="success", description="API health status")
    message: str = Field(
        default="Clothing Ecommerce API is running",
        description="Health status message",
    )


class DatabaseHealthResponse(BaseModel):
    """ Database connection verification responce schema """
    status: str = Field(
        default="healthy",
        description="API operational status",
        examples=["healthy"],
    )
    database_connection: str = Field(
        default="connected",
        description="Database connection status",
        examples=["connected"],
    )
    database_type: str = Field(
        default="MySQL",
        description="database engine type",
        examples=["MySQL"],
    )

class APIResponse(BaseSchema, Generic[T]):
    """Standard generic API response envelope."""

    status: str = "success"
    message: Optional[str] = None
    data: Optional[T] = None


class ErrorResponse(BaseModel):
    """Standard API error response format."""

    status: str = "error"
    code: str
    message: str
    details: Optional[Any] = None


class PaginationParams(BaseModel):
    """Standard query parameters for pagination."""

    page: int = Field(default=1, ge=1, description="Page number starting from 1")
    page_size: int = Field(default=20, ge=1, le=100, description="Items per page")

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size


class PaginatedResponse(BaseSchema, Generic[T]):
    """Standard paginated payload wrapper."""

    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int

