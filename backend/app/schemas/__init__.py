"""Pydantic schemas package."""

from app.schemas.common import (
    APIResponse,
    BaseSchema,
    DatabaseHealthResponse,
    ErrorResponse,
    HealthResponse,
    PaginatedResponse,
    PaginationParams,
    SystemHealthResponse,
)

from app.schemas.auth import (
    LoginRequest,
    RefreshTokenRequest,
    Token,
    TokenPayload,
)

from app.schemas.user import (
    PasswordChangeRequest,
    RoleResponse,
    UserAddressCreate,
    UserAddressResponse,
    UserAddressUpdate,
    UserCreate,
    UserResponse,
    UserUpdate,
    UserWithRolesResponse,
)





__all__ = [
    "BaseSchema",
    "HealthResponse",
    "DatabaseHealthResponse",
    "SystemHealthResponse",
    "APIResponse",
    "ErrorResponse",
    "PaginationParams",
    "PaginatedResponse",
    # Auth
    "LoginRequest",
    "RefreshTokenRequest",
    "Token",
    "TokenPayload",
    # User
    "RoleResponse",
    "UserCreate",
    "UserUpdate",
    "UserResponse",
    "UserWithRolesResponse",
    "PasswordChangeRequest",
    "UserAddressCreate",
    "UserAddressUpdate",
    "UserAddressResponse",
]

