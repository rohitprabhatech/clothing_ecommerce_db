import json
from pathlib import Path
from typing import Any, Union
from urllib.parse import quote_plus
from pydantic import computed_field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Base backend directory
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = BACKEND_DIR / ".env"


class Settings(BaseSettings):
    """Application Settings loaded from environment variables and .env file."""

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE_PATH) if ENV_FILE_PATH.exists() else ".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Application Information
    APP_NAME: str = "Clothing Ecommerce API"
    APP_VERSION: str = "0.1.0"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # Security & JWT
    SECRET_KEY: str = "replace_with_a_secure_random_secret_key_minimum_32_characters"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # MySQL Database Connection
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = "Rohit@5159"
    DB_NAME: str = "clothing_ecommerce_db"
    DB_ECHO: bool = False
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_RECYCLE: int = 3600

    # CORS Origins
    BACKEND_CORS_ORIGINS: Union[list[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000",
    ]

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug_value(cls, v: Any) -> bool:
        if isinstance(v, bool):
            return v
        if isinstance(v, str):
            val = v.strip().lower()
            if val in ("true", "1", "yes", "on", "t", "debug", "dev", "development"):
                return True
            if val in ("false", "0", "no", "off", "f", "warn", "warning", "info", "error", "prod", "production"):
                return False
        return bool(v)

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            if v.strip().startswith("["):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        if isinstance(v, list):
            return [str(origin).strip() for origin in v if str(origin).strip()]
        return []

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        """Construct MySQL SQLAlchemy 2.0 connection URI."""
        password_part = (
            f":{quote_plus(self.DB_PASSWORD)}" if self.DB_PASSWORD else ""
        )
        return (
            f"mysql+pymysql://{quote_plus(self.DB_USER)}{password_part}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?charset=utf8mb4"
        )


# Global settings instance
settings = Settings()

