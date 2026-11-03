"""Pydantic v2 schemas for User, Role, and UserAddress domain entities."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import EmailStr, Field

from app.schemas.common import BaseSchema


# ============================================================================
# ROLE SCHEMAS
# ============================================================================
class RoleResponse(BaseSchema):
    """Schema representing user role response."""

    role_id: int
    role_name: str
    description: Optional[str] = None


# ============================================================================
# USER ADDRESS SCHEMAS
# ============================================================================
class UserAddressBase(BaseSchema):
    """Base fields for customer delivery addresses."""

    recipient_name: str = Field(..., min_length=1, max_length=150, description="Full name of the recipient")
    street_address: str = Field(..., min_length=1, description="Street name, house number, building")
    apartment_suite: Optional[str] = Field(None, max_length=100, description="Apartment, suite, unit, floor")
    city: str = Field(..., min_length=1, max_length=100, description="City / Town")
    state: str = Field(..., min_length=1, max_length=100, description="State / Province")
    postal_code: str = Field(..., min_length=1, max_length=20, description="PIN code / Postal code")
    country: str = Field(default="India", max_length=100, description="Country name")
    phone_number: str = Field(..., min_length=5, max_length=20, description="Contact phone number for delivery")
    is_default: bool = Field(default=False, description="Whether this is the default shipping address")


class UserAddressCreate(UserAddressBase):
    """Schema for adding a new delivery address."""
    pass


class UserAddressUpdate(BaseSchema):
    """Schema for partially updating an existing delivery address."""

    recipient_name: Optional[str] = Field(None, min_length=1, max_length=150)
    street_address: Optional[str] = Field(None, min_length=1)
    apartment_suite: Optional[str] = Field(None, max_length=100)
    city: Optional[str] = Field(None, min_length=1, max_length=100)
    state: Optional[str] = Field(None, min_length=1, max_length=100)
    postal_code: Optional[str] = Field(None, min_length=1, max_length=20)
    country: Optional[str] = Field(None, max_length=100)
    phone_number: Optional[str] = Field(None, min_length=5, max_length=20)
    is_default: Optional[bool] = None


class UserAddressResponse(UserAddressBase):
    """Response payload for a customer delivery address."""

    address_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime


# ============================================================================
# USER ACCOUNT SCHEMAS
# ============================================================================
class UserBase(BaseSchema):
    """Shared fields for User entity."""

    email: EmailStr = Field(..., description="Unique email address used for login")
    first_name: str = Field(..., min_length=1, max_length=100, description="Customer first name")
    last_name: Optional[str] = Field(None, max_length=100, description="Customer last name")
    phone_number: Optional[str] = Field(None, max_length=20, description="Unique contact phone number")


class UserCreate(UserBase):
    """Schema for customer registration."""

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        description="Secure plain text password (minimum 8 characters)",
    )


class UserUpdate(BaseSchema):
    """Schema for updating personal customer profile information."""

    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    phone_number: Optional[str] = Field(None, max_length=20)


class PasswordChangeRequest(BaseSchema):
    """Schema for authenticated password change."""

    current_password: str = Field(..., min_length=8, description="Existing account password")
    new_password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        description="New secure password (minimum 8 characters)",
    )


class UserResponse(UserBase):
    """Public customer profile response schema."""

    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime


class UserWithRolesResponse(UserResponse):
    """Complete user profile response including assigned RBAC roles and default address."""

    roles: list[RoleResponse] = []
    addresses: list[UserAddressResponse] = []