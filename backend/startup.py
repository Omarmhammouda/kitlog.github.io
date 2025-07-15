#!/usr/bin/env python3
"""
Startup script that runs database migrations before starting the FastAPI server.
This ensures the database is up to date on every deployment.
"""

import os
import sys
import subprocess
from sqlalchemy import create_engine, text
from app.core.config import settings
from app.models.base import Base
from app.models.team import Team, TeamMembership, TeamInvitation
from app.models.equipment import Equipment
from app.models.signup import EmailSignup

def run_migrations():
    """Run database migrations."""
    print("🚀 Starting database migrations...")
    
    try:
        # Create engine
        engine = create_engine(settings.DATABASE_URL)
        
        # Create all tables (this is safe - SQLAlchemy won't recreate existing tables)
        Base.metadata.create_all(engine)
        
        print("✅ Database tables created/updated successfully!")
        
        # Verify team tables exist
        with engine.connect() as conn:
            try:
                result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%team%'"))
                team_tables = result.fetchall()
                
                if team_tables:
                    print(f"✅ Found {len(team_tables)} team tables:")
                    for table in team_tables:
                        print(f"  - {table[0]}")
                else:
                    print("⚠️  No team tables found - this might be expected on first run")
                    
            except Exception as e:
                # This might fail on PostgreSQL, that's okay
                print(f"ℹ️  Could not verify tables (this is normal for PostgreSQL): {e}")
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
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
