from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.models.base import Base

class EmailSignup(Base):
    __tablename__ = "email_signups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    source = Column(String, default="landing_page")  # Track where signup came from
