from app.schemas.common import (
    APIResponse,
    HealthResponse,
    PaginatedResponse,
    PaginationParams,
)


def test_pagination_params_offset() -> None:
    p1 = PaginationParams(page=1, page_size=20)
    assert p1.offset == 0

    p2 = PaginationParams(page=3, page_size=15)
    assert p2.offset == 30


def test_api_response_envelope() -> None:
    resp = APIResponse[dict](status="success", message="Fetched successfully", data={"id": 1})
    assert resp.status == "success"
    assert resp.data == {"id": 1}


def test_paginated_response() -> None:
    paginated = PaginatedResponse[str](
        items=["Item 1", "Item 2"],
        total=50,
        page=1,
        page_size=2,
        total_pages=25,
    )
    assert len(paginated.items) == 2
    assert paginated.total == 50

