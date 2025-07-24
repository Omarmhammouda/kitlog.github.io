from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.models.base import get_db

router = APIRouter()

@router.post("/migrate-owner-columns")
async def migrate_owner_columns(db: Session = Depends(get_db)):
    """
    Admin endpoint to add owner_id and owner_name columns to equipment table
    This should be called once after deploying the updated equipment model
    """
    try:
        # Check if columns already exist
        result = db.execute(text("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'equipment' 
            AND column_name IN ('owner_id', 'owner_name')
        """))
        
        existing_columns = [row[0] for row in result.fetchall()]
        changes_made = []
        
        # Add owner_id column if it doesn't exist
        if 'owner_id' not in existing_columns:
            db.execute(text("""
                ALTER TABLE equipment 
                ADD COLUMN owner_id VARCHAR
            """))
            
            # Add index for owner_id
            db.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_equipment_owner_id 
                ON equipment (owner_id)
            """))
            changes_made.append("Added owner_id column and index")
        else:
            changes_made.append("owner_id column already exists")
        
        # Add owner_name column if it doesn't exist
        if 'owner_name' not in existing_columns:
            db.execute(text("""
                ALTER TABLE equipment 
                ADD COLUMN owner_name VARCHAR
            """))
            changes_made.append("Added owner_name column")
        else:
            changes_made.append("owner_name column already exists")
        
        # Commit the changes
        db.commit()
        
        return {
            "success": True,
            "message": "Migration completed successfully",
            "changes": changes_made
        }
        
    except OperationalError as e:
        db.rollback()
        raise HTTPException(
            status_code=500, 
            detail=f"Database migration failed: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error during migration: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy", "message": "Admin endpoints are working"}

@router.get("/equipment-schema")
async def check_equipment_schema(db: Session = Depends(get_db)):
    """Debug endpoint to check equipment table schema"""
    try:
        # Check what columns exist in the equipment table
        result = db.execute(text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'equipment'
            ORDER BY ordinal_position
        """))
        
        columns = [{
            "name": row[0],
            "type": row[1], 
            "nullable": row[2]
        } for row in result.fetchall()]
        
        # Also check current Alembic revision
        try:
            revision_result = db.execute(text("SELECT version_num FROM alembic_version"))
            current_revision = revision_result.fetchone()
            current_revision = current_revision[0] if current_revision else "None"
        except:
            current_revision = "No alembic_version table"
        
        return {
            "current_revision": current_revision,
            "equipment_columns": columns,
            "total_columns": len(columns)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error checking schema: {str(e)}"
        )
