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


def test_system_health_endpoint(client: TestClient) -> None:
    """Test the GET /api/v1/health/system endpoint response structure."""
    response = client.get("/api/v1/health/system")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "app_name" in data
    assert "version" in data
    assert "python_version" in data
    assert data["database_dialect"] == "PostgreSQL"


def test_database_health_endpoint_mocked_success(client: TestClient) -> None:
    """Test the GET /api/v1/health/database endpoint when connection succeeds."""
    from unittest.mock import MagicMock
    from app.core.database import get_db
    from app.main import app

    mock_session = MagicMock()
    mock_session.execute.return_value.scalar.return_value = 1

    app.dependency_overrides[get_db] = lambda: mock_session
    try:
        response = client.get("/api/v1/health/database")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database_connection"] == "connected"
        assert data["database_type"] == "PostgreSQL"
    finally:
        app.dependency_overrides.pop(get_db, None)


def test_database_health_endpoint_mocked_failure(client: TestClient) -> None:
    """Test the GET /api/v1/health/database endpoint when database query fails."""
    from unittest.mock import MagicMock
    from app.core.database import get_db
    from app.main import app

    mock_session = MagicMock()
    mock_session.execute.side_effect = Exception("Connection lost")

    app.dependency_overrides[get_db] = lambda: mock_session
    try:
        response = client.get("/api/v1/health/database")
        assert response.status_code == 503
        data = response.json()
        assert "detail" in data
        assert data["detail"]["status"] == "unhealthy"
        assert data["detail"]["database_connection"] == "disconnected"
        assert data["detail"]["database_type"] == "PostgreSQL"
    finally:
        app.dependency_overrides.pop(get_db, None)


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

