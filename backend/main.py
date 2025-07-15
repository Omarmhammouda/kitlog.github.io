from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.api.v1.api import api_router
from app.core.config import settings
from app.models.base import engine, Base
from app.models.signup import EmailSignup  # Import to register the table
from app.models.equipment import Equipment  # Import to register the table
from app.models.team import Team, TeamMembership, TeamInvitation  # Import to register team tables
from app.models.user import User  # Import to register user table

# Load environment variables
load_dotenv()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI backend for KitLog application",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Run migrations on startup
@app.on_event("startup")
def run_startup_migrations():
    from startup import run_migrations
    print("🚀 Running startup migrations...")
    if not run_migrations():
        print("❌ Migration failed during startup")
        raise Exception("Database migration failed")
    print("✅ Startup migrations completed successfully!")

# Include API routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to KitLog API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
