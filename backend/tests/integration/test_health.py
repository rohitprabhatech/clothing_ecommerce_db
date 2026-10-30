from fastapi.testclient import TestClient


def test_health_check_endpoint(client: TestClient) -> None:
    """Test the GET /api/v1/health endpoint response structure and content."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["message"] == "Clothing Ecommerce API is running"


def test_root_endpoint(client: TestClient) -> None:
    """Test root endpoint metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert data["docs_url"] == "/docs"
    assert data["health_check"] == "/api/v1/health"


def test_documentation_endpoints(client: TestClient) -> None:
    """Verify Swagger UI and ReDoc endpoints are accessible."""
    docs_response = client.get("/docs")
    assert docs_response.status_code == 200

    redoc_response = client.get("/redoc")
    assert redoc_response.status_code == 200

    openapi_response = client.get("/api/v1/openapi.json")
    assert openapi_response.status_code == 200
    openapi_data = openapi_response.json()
    assert openapi_data["info"]["title"] == "Clothing Ecommerce API"

