#!/usr/bin/env python3
"""
Migration script to add owner_id and owner_name columns to equipment table
Run this on Railway or any environment with database access
"""

import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

# Add the app directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings

def migrate_database():
    """Add owner_id and owner_name columns to equipment table"""
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if columns already exist
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'equipment' 
                AND column_name IN ('owner_id', 'owner_name')
            """))
            
            existing_columns = [row[0] for row in result.fetchall()]
            
            # Add owner_id column if it doesn't exist
            if 'owner_id' not in existing_columns:
                print("Adding owner_id column...")
                conn.execute(text("""
                    ALTER TABLE equipment 
                    ADD COLUMN owner_id VARCHAR
                """))
                
                # Add index for owner_id
                conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_equipment_owner_id 
                    ON equipment (owner_id)
                """))
                print("✓ Added owner_id column and index")
            else:
                print("✓ owner_id column already exists")
            
            # Add owner_name column if it doesn't exist
            if 'owner_name' not in existing_columns:
                print("Adding owner_name column...")
                conn.execute(text("""
                    ALTER TABLE equipment 
                    ADD COLUMN owner_name VARCHAR
                """))
                print("✓ Added owner_name column")
            else:
                print("✓ owner_name column already exists")
            
            # Commit the changes
            conn.commit()
            print("✅ Migration completed successfully!")
            
    except OperationalError as e:
        print(f"❌ Database migration failed: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Starting database migration...")
    print(f"Database URL: {settings.DATABASE_URL[:50]}...")  # Don't print full URL for security
    migrate_database()
