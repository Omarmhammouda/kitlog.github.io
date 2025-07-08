from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.item import Item, ItemCreate, ItemUpdate

router = APIRouter()

# Mock database
fake_items_db = [
    {"id": 1, "name": "Item 1", "description": "First item"},
    {"id": 2, "name": "Item 2", "description": "Second item"},
]

@router.get("/", response_model=List[Item])
async def get_items():
    """Get all items"""
    return fake_items_db

@router.get("/{item_id}", response_model=Item)
async def get_item(item_id: int):
    """Get a specific item by ID"""
    item = next((item for item in fake_items_db if item["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.post("/", response_model=Item)
async def create_item(item: ItemCreate):
    """Create a new item"""
    new_id = max([item["id"] for item in fake_items_db], default=0) + 1
    new_item = {"id": new_id, **item.dict()}
    fake_items_db.append(new_item)
    return new_item

@router.put("/{item_id}", response_model=Item)
async def update_item(item_id: int, item: ItemUpdate):
    """Update an existing item"""
    db_item = next((item for item in fake_items_db if item["id"] == item_id), None)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        db_item[key] = value
    
    return db_item

@router.delete("/{item_id}")
async def delete_item(item_id: int):
    """Delete an item"""
    global fake_items_db
    fake_items_db = [item for item in fake_items_db if item["id"] != item_id]
    return {"message": "Item deleted successfully"}
