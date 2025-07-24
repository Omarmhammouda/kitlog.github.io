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
    condition = Column(String, default="good")  # excellent, good, fair, poor, needs_repair
    is_available = Column(Boolean, default=True)
    location = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # User or Team ownership - using String for owner_id to match Auth0 user IDs
    owner_id = Column(String, nullable=True, index=True)
    owner_name = Column(String, nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True, index=True)
    
    # Relationships
    team = relationship("Team", foreign_keys=[team_id])
