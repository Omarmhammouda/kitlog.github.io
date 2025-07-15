from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "KitLog API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:5173",
        "https://kitlog.io",
        "https://kitloggithubio-production-eae4.up.railway.app"
    ]
    
    # Database - will be overridden by Railway's DATABASE_URL
    DATABASE_URL: str = "sqlite:///./kitlog.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Auth0 Settings
    AUTH0_DOMAIN: str = "dev-your-domain.us.auth0.com"  # Will be overridden by env var
    AUTH0_CLIENT_ID: str = "your-client-id"  # Will be overridden by env var
    AUTH0_CLIENT_SECRET: str = "your-client-secret"  # Will be overridden by env var
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
