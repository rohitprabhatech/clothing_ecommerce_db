"""Pydantic v2 schemas for Authentication, Login, and JWT Token operations."""

from __future__ import annotations

from typing import Optional

from pydantic import EmailStr, Field

from app.schemas.common import BaseSchema


class LoginRequest(BaseSchema):
    """Customer credentials payload for logging in."""

    email: EmailStr = Field(..., description="Registered customer email address")
    password: str = Field(..., min_length=1, description="Account password")


class RefreshTokenRequest(BaseSchema):
    """Payload containing a valid JWT refresh token to renew session."""

    refresh_token: str = Field(..., min_length=1, description="Signed JWT refresh token")


class Token(BaseSchema):
    """RFC 6749 compliant JWT access and refresh token response."""

    access_token: str = Field(..., description="Signed Bearer JWT access token")
    refresh_token: str = Field(..., description="Signed Bearer JWT refresh token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Access token expiration lifespan in seconds")


class TokenPayload(BaseSchema):
    """Internal decoded JWT token payload representation."""

    sub: Optional[str] = None
    type: Optional[str] = None
    exp: Optional[int] = None
    