from fastapi import status
from app.core.exceptions import (
    AppException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
    ValidationException,
)


def test_exception_status_codes_and_defaults() -> None:
    not_found = NotFoundException("Item missing")
    assert not_found.status_code == status.HTTP_404_NOT_FOUND
    assert not_found.code == "NOT_FOUND"
    assert not_found.message == "Item missing"

    bad_request = BadRequestException()
    assert bad_request.status_code == status.HTTP_400_BAD_REQUEST
    assert bad_request.code == "BAD_REQUEST"

    unauth = UnauthorizedException()
    assert unauth.status_code == status.HTTP_401_UNAUTHORIZED
    assert unauth.code == "UNAUTHORIZED"

    forbidden = ForbiddenException()
    assert forbidden.status_code == status.HTTP_403_FORBIDDEN
    assert forbidden.code == "FORBIDDEN"

    conflict = ConflictException()
    assert conflict.status_code == status.HTTP_409_CONFLICT
    assert conflict.code == "CONFLICT"

    val_err = ValidationException(details={"field": "required"})
    assert val_err.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert val_err.code == "VALIDATION_ERROR"
    assert val_err.details == {"field": "required"}

