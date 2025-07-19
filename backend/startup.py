#!/usr/bin/env python3
"""
Startup script that runs Alembic migrations before starting the FastAPI server.
This ensures the database is up to date on every deployment.
"""

import os
import sys
import subprocess
from sqlalchemy import create_engine, text
from alembic.config import Config
from alembic import command
from app.core.config import settings

def run_migrations():
    """Run Alembic database migrations."""
    print("🚀 Starting Alembic migrations...")
    
    try:
        # Create Alembic config
        alembic_cfg = Config("alembic.ini")
        
        # Override the database URL in case it's different
        alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
        
        # Check current revision
        print("📝 Checking current database revision...")
        try:
            command.current(alembic_cfg, verbose=True)
        except Exception as e:
            print(f"⚠️ Could not get current revision (database might be new): {e}")
            
            # For new databases, we might need to stamp the initial revision
            print("📝 Stamping database with base revision...")
            command.stamp(alembic_cfg, "base")
        
        # Run migrations to head
        print("📝 Running migrations to head...")
        command.upgrade(alembic_cfg, "head")
        
        print("✅ Alembic migrations completed successfully")
        
        # Verify tables exist
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            if "sqlite" in settings.DATABASE_URL.lower():
                result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
                tables = [row[0] for row in result.fetchall()]
            else:
                result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
                tables = [row[0] for row in result.fetchall()]
            
            print(f"✅ Found {len(tables)} tables: {', '.join(tables)}")
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run migrations and start the server."""
    print("🔧 Running startup sequence...")
    
    # Run migrations
    if not run_migrations():
        print("❌ Migration failed, exiting...")
        sys.exit(1)
    
    print("✅ Startup sequence completed successfully!")
    
    # Start the FastAPI server
    print("🚀 Starting FastAPI server...")
    os.system("python -m uvicorn main:app --host 0.0.0.0 --port 8000")

if __name__ == "__main__":
    main()
