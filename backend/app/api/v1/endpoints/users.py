from fastapi import APIRouter, HTTPException
from typing import List

from app.schemas.user import User, UserCreate, UserUpdate

router = APIRouter()

# Mock database
fake_users_db = [
    {"id": 1, "email": "user1@example.com", "name": "User One", "is_active": True},
    {"id": 2, "email": "user2@example.com", "name": "User Two", "is_active": True},
]

@router.get("/", response_model=List[User])
async def get_users():
    """Get all users"""
    return fake_users_db

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user by ID"""
    user = next((user for user in fake_users_db if user["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    # Check if email already exists
    existing_user = next((u for u in fake_users_db if u["email"] == user.email), None)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_id = max([user["id"] for user in fake_users_db], default=0) + 1
    new_user = {"id": new_id, **user.dict(), "is_active": True}
    fake_users_db.append(new_user)
    return new_user

@router.put("/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserUpdate):
    """Update an existing user"""
    db_user = next((user for user in fake_users_db if user["id"] == user_id), None)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user.dict(exclude_unset=True)
    for key, value in update_data.items():
        db_user[key] = value
    
    return db_user

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    """Delete a user"""
    global fake_users_db
    fake_users_db = [user for user in fake_users_db if user["id"] != user_id]
    return {"message": "User deleted successfully"}
