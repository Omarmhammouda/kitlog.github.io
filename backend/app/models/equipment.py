from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.base import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False, index=True)
    brand = Column(String, nullable=True)
    model = Column(String, nullable=True)
    serial_number = Column(String, unique=True, nullable=True, index=True)
    condition = Column(String, default="good")  # good, fair, poor, needs_repair
    is_available = Column(Boolean, default=True)
    location = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Auth0 user ID (e.g., "auth0|123456789") - no foreign key needed
    owner_id = Column(String, nullable=True, index=True)
    
    # Optional: store user display name for convenience (denormalized)
    owner_name = Column(String, nullable=True)
