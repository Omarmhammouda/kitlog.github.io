from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    subscription_type = Column(String, default="free")  # free or paid
    is_active = Column(Boolean, default=True)

    # Relationships
    members = relationship("TeamMembership", back_populates="team", cascade="all, delete-orphan")
    invitations = relationship("TeamInvitation", back_populates="team", cascade="all, delete-orphan")

class TeamMembership(Base):
    __tablename__ = "team_memberships"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)  # Auth0 user ID
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    role = Column(String, default="member")  # owner, admin, member
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Optional: store user display name for convenience (denormalized)
    user_name = Column(String, nullable=True)
    user_email = Column(String, nullable=True)

    # Relationships
    team = relationship("Team", back_populates="members")

class TeamInvitation(Base):
    __tablename__ = "team_invitations"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    role = Column(String, default="member")  # admin, member
    token = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_accepted = Column(Boolean, default=False)
    accepted_at = Column(DateTime(timezone=True), nullable=True)
    
    # Who sent the invitation
    invited_by_user_id = Column(String, nullable=False)
    invited_by_name = Column(String, nullable=True)

    # Relationships
    team = relationship("Team", back_populates="invitations")
