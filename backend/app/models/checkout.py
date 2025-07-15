from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.base import Base

class EquipmentCheckout(Base):
    __tablename__ = "equipment_checkouts"

    id = Column(Integer, primary_key=True, index=True)
    
    # Equipment being checked out
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)
    
    # User who checked out the equipment
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Checkout details
    checked_out_at = Column(DateTime(timezone=True), server_default=func.now())
    checked_in_at = Column(DateTime(timezone=True), nullable=True)
    
    # Optional notes
    checkout_notes = Column(Text, nullable=True)
    checkin_notes = Column(Text, nullable=True)
    
    # Status tracking
    is_active = Column(Boolean, default=True)  # False when checked back in
    
    # Due date (optional)
    due_date = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    equipment = relationship("Equipment", back_populates="checkouts")
    user = relationship("User", back_populates="checkouts")
    
    def __repr__(self):
        return f"<EquipmentCheckout {self.equipment_id} by {self.user_id}>"
