from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    # Auth0 fields
    auth0_id = Column(String, unique=True, nullable=False, index=True)  # e.g., "auth0|123456789"
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    picture = Column(String, nullable=True)
    email_verified = Column(Boolean, default=False)
    
    # App-specific fields
    display_name = Column(String, nullable=True)  # Optional custom display name
    bio = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    # Onboarding
    has_completed_onboarding = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Auth0 metadata (JSON stored as string)
    auth0_metadata = Column(Text, nullable=True)
    
    # Relationships
    # Removed team_memberships relationship due to lack of foreign key reference
    
    def __repr__(self):
        return f"<User {self.email}>"
