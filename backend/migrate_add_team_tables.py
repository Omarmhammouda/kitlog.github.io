#!/usr/bin/env python3
"""
Migration script to add team-related tables to the database.
This script creates the teams, team_memberships, and team_invitations tables.
"""

from sqlalchemy import create_engine, text
from app.core.config import settings
from app.models.base import Base
from app.models.team import Team, TeamMembership, TeamInvitation

def create_team_tables():
    """Create the team-related tables in the database."""
    engine = create_engine(settings.DATABASE_URL)
    
    # Create tables
    Base.metadata.create_all(engine)
    
    print("✅ Team tables created successfully!")
    
    # Print table info
    with engine.connect() as conn:
        # Check if tables exist
        result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%team%'"))
        tables = result.fetchall()
        
        if tables:
            print(f"✅ Created {len(tables)} team-related tables:")
            for table in tables:
                print(f"  - {table[0]}")
        else:
            print("❌ No team tables found!")

def main():
    """Run the migration."""
    print("🚀 Starting team tables migration...")
    create_team_tables()
    print("✅ Migration completed!")

if __name__ == "__main__":
    main()
