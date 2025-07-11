from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EquipmentBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    brand: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    condition: str = "good"
    is_available: bool = True
    location: Optional[str] = None
    notes: Optional[str] = None
    owner_id: Optional[str] = None
    owner_name: Optional[str] = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    condition: Optional[str] = None
    is_available: Optional[bool] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    owner_id: Optional[str] = None
    owner_name: Optional[str] = None

class EquipmentResponse(EquipmentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
