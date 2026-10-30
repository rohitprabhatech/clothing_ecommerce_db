from datetime import timedelta
import pytest
from jose import jwt
from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_password_hash,
    verify_password,
)


def test_argon2_password_hashing() -> None:
    """Test Argon2 password hashing and correct verification."""
    raw_password = "SuperSecurePassword123!"
    hashed = get_password_hash(raw_password)

    assert hashed != raw_password
    assert hashed.startswith("$argon2")
    assert verify_password(raw_password, hashed) is True
    assert verify_password("WrongPassword!", hashed) is False


def test_jwt_access_token_creation_and_decode() -> None:
    """Test creating and decoding a valid JWT access token."""
    subject = "user_42"
    token = create_access_token(subject=subject, extra_claims={"role": "admin"})

    payload = decode_token(token)
    assert payload["sub"] == subject
    assert payload["role"] == "admin"
    assert payload["type"] == "access"
    assert "exp" in payload
    assert "iat" in payload


def test_jwt_refresh_token_creation() -> None:
    """Test creating and decoding a valid JWT refresh token."""
    subject = "user_99"
    token = create_refresh_token(subject=subject)

    payload = decode_token(token)
    assert payload["sub"] == subject
    assert payload["type"] == "refresh"


def test_expired_token_handling() -> None:
    """Test that decoding an expired token raises an appropriate error."""
    subject = "user_expired"
    # Create token expired 1 minute ago
    token = create_access_token(subject=subject, expires_delta=timedelta(minutes=-1))

    with pytest.raises(jwt.ExpiredSignatureError):
        decode_token(token)

