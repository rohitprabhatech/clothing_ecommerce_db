from app.core.config import Settings


def test_config_computed_uri() -> None:
    test_settings = Settings(
        DB_HOST="127.0.0.1",
        DB_PORT=3306,
        DB_USER="ecommerce_user",
        DB_PASSWORD="p@ssword#123",
        DB_NAME="clothing_ecommerce",
    )
    uri = test_settings.SQLALCHEMY_DATABASE_URI
    assert uri.startswith("mysql+pymysql://ecommerce_user:p%40ssword%23123@127.0.0.1:3306/clothing_ecommerce")


def test_cors_origins_parsing() -> None:
    # Test JSON string parsing
    s1 = Settings(BACKEND_CORS_ORIGINS='["http://localhost:3000", "http://localhost:8080"]')
    assert s1.BACKEND_CORS_ORIGINS == ["http://localhost:3000", "http://localhost:8080"]

    # Test comma-separated string parsing
    s2 = Settings(BACKEND_CORS_ORIGINS="http://localhost:3000, http://localhost:8080")
    assert s2.BACKEND_CORS_ORIGINS == ["http://localhost:3000", "http://localhost:8080"]

    # Test list directly
    s3 = Settings(BACKEND_CORS_ORIGINS=["http://example.com"])
    assert s3.BACKEND_CORS_ORIGINS == ["http://example.com"]

