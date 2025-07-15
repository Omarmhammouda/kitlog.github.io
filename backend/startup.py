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
from app.models.user import User

def run_migrations():
    """Run database migrations step by step."""
    print("🚀 Starting database migrations...")
    
    try:
        # Create engine
        engine = create_engine(settings.DATABASE_URL)
        
        # Step 1: Create User table first (no foreign keys)
        print("📝 Step 1: Creating User table...")
        from app.models.user import User
        User.__table__.create(engine, checkfirst=True)
        print("✅ User table created")
        
        # Step 2: Create other tables
        print("📝 Step 2: Creating other tables...")
        Base.metadata.create_all(engine)
        print("✅ All tables created")
        
        # Step 3: Add foreign key constraints if needed
        print("📝 Step 3: Adding foreign key constraints...")
        with engine.connect() as conn:
            try:
                # Check if we're using SQLite or PostgreSQL
                if "sqlite" in settings.DATABASE_URL.lower():
                    # SQLite: Check if foreign keys are enabled
                    result = conn.execute(text("PRAGMA foreign_keys"))
                    fk_status = result.fetchone()
                    if fk_status and fk_status[0] == 0:
                        conn.execute(text("PRAGMA foreign_keys = ON"))
                        print("✅ Foreign keys enabled for SQLite")
                else:
                    # PostgreSQL: Foreign keys are handled automatically
                    print("✅ Foreign keys handled by PostgreSQL")
                    
                # Verify tables exist
                if "sqlite" in settings.DATABASE_URL.lower():
                    result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
                    tables = [row[0] for row in result.fetchall()]
                else:
                    result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
                    tables = [row[0] for row in result.fetchall()]
                
                print(f"✅ Found {len(tables)} tables: {', '.join(tables)}")
                
            except Exception as e:
                print(f"⚠️  Could not verify constraints (this might be normal): {e}")
        
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
