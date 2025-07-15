from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str
    display_name: Optional[str] = None
    bio: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    auth0_id: str
    picture: Optional[str] = None
    email_verified: bool = False

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    display_name: Optional[str] = None
    bio: Optional[str] = None
    is_active: Optional[bool] = None
    picture: Optional[str] = None

class User(UserBase):
    id: int
    auth0_id: str
    picture: Optional[str] = None
    email_verified: bool
    is_admin: bool = False
    has_completed_onboarding: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True
