from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional

from app.schemas.equipment import EquipmentCreate, EquipmentUpdate, EquipmentResponse
from app.models.equipment import Equipment
from app.models.base import get_db

router = APIRouter()

@router.post("/", response_model=EquipmentResponse)
def create_equipment(
    equipment: EquipmentCreate,
    db: Session = Depends(get_db)
):
    """Create a new equipment item"""
    try:
        print(f"Creating equipment with data: {equipment.dict()}")
        db_equipment = Equipment(**equipment.dict())
        print(f"Created Equipment object: {db_equipment.__dict__}")
        db.add(db_equipment)
        print("Added to session, committing...")
        db.commit()
        print("Committed successfully, refreshing...")
        db.refresh(db_equipment)
        print(f"Equipment created successfully with ID: {db_equipment.id}")
        return db_equipment
    except IntegrityError as e:
        print(f"IntegrityError occurred: {str(e)}")
        db.rollback()
        if "serial_number" in str(e):
            raise HTTPException(
                status_code=400, 
                detail="Serial number already exists"
            )
        raise HTTPException(status_code=400, detail=f"Database integrity error: {str(e)}")
    except Exception as e:
        print(f"Unexpected error occurred: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        traceback.print_exc()
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/", response_model=List[EquipmentResponse])
def get_equipment(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    available_only: bool = False,
    owner_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all equipment with optional filtering"""
    query = db.query(Equipment)
    
    if category:
        query = query.filter(Equipment.category == category)
    
    if available_only:
        query = query.filter(Equipment.is_available == True)
    
    if owner_id:
        query = query.filter(Equipment.owner_id == owner_id)
    
    equipment = query.offset(skip).limit(limit).all()
    return equipment

@router.get("/{equipment_id}", response_model=EquipmentResponse)
def get_equipment_by_id(equipment_id: int, db: Session = Depends(get_db)):
    """Get equipment by ID"""
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment

@router.put("/{equipment_id}", response_model=EquipmentResponse)
def update_equipment(
    equipment_id: int,
    equipment_update: EquipmentUpdate,
    db: Session = Depends(get_db)
):
    """Update equipment by ID"""
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    # Update only provided fields
    update_data = equipment_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(equipment, field, value)
    
    try:
        db.commit()
        db.refresh(equipment)
        return equipment
    except IntegrityError as e:
        db.rollback()
        if "serial_number" in str(e):
            raise HTTPException(
                status_code=400, 
                detail="Serial number already exists"
            )
        raise HTTPException(status_code=400, detail="Database error")

@router.delete("/{equipment_id}")
def delete_equipment(equipment_id: int, db: Session = Depends(get_db)):
    """Delete equipment by ID"""
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    db.delete(equipment)
    db.commit()
    return {"message": "Equipment deleted successfully"}

@router.get("/categories/list")
def get_equipment_categories(db: Session = Depends(get_db)):
    """Get list of all equipment categories"""
    categories = db.query(Equipment.category).distinct().all()
    return {"categories": [cat[0] for cat in categories if cat[0]]}

@router.get("/stats/summary")
def get_equipment_stats(owner_id: Optional[str] = None, db: Session = Depends(get_db)):
    """Get equipment statistics, optionally filtered by owner"""
    query = db.query(Equipment)
    
    if owner_id:
        query = query.filter(Equipment.owner_id == owner_id)
    
    total_items = query.count()
    available_items = query.filter(Equipment.is_available == True).count()
    in_use_items = total_items - available_items
    categories = query.with_entities(Equipment.category).distinct().count()
    
    return {
        "total_items": total_items,
        "available_items": available_items,
        "in_use_items": in_use_items,
        "categories": categories
    }
