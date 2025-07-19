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
        
        # Check if database has existing tables
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            # Check if alembic_version table exists
            if "sqlite" in settings.DATABASE_URL.lower():
                result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='alembic_version'"))
                has_alembic_table = result.fetchone() is not None
                
                result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='teams'"))
                has_teams_table = result.fetchone() is not None
            else:
                # PostgreSQL
                result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='alembic_version'"))
                has_alembic_table = result.fetchone() is not None
                
                result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='teams'"))
                has_teams_table = result.fetchone() is not None
        
        # Handle different scenarios
        if has_teams_table and not has_alembic_table:
            # Database has tables but no Alembic tracking - stamp it
            print("📝 Database has existing tables but no Alembic tracking")
            print("📝 Stamping database at revision 002 (current schema state)...")
            command.stamp(alembic_cfg, "002")
        elif not has_alembic_table:
            # New database - stamp at base
            print("📝 New database detected, stamping at base...")
            command.stamp(alembic_cfg, "base")
        
        # Check current revision
        print("📝 Checking current database revision...")
        try:
            command.current(alembic_cfg, verbose=True)
        except Exception as e:
            print(f"⚠️ Could not get current revision: {e}")
        
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
