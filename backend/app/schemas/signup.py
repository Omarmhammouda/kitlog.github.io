from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EmailSignupCreate(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    source: str = "landing_page"

class EmailSignupResponse(BaseModel):
    id: int
    name: Optional[str] = None
    email: str
    created_at: datetime
    source: str
    
    class Config:
        from_attributes = True
