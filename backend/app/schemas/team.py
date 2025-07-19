from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class SubscriptionType(str, Enum):
    FREE = "free"
    PAID = "paid"

class TeamRole(str, Enum):
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"

# Team schemas
class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None
    subscription_type: SubscriptionType = SubscriptionType.FREE

class TeamCreate(TeamBase):
    pass

class TeamUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    subscription_type: Optional[SubscriptionType] = None

class Team(TeamBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_active: bool = True
    
    class Config:
        from_attributes = True

# Team membership schemas
class TeamMembershipBase(BaseModel):
    user_id: int  # Foreign key to users.id
    role: TeamRole = TeamRole.MEMBER

class TeamMembershipCreate(TeamMembershipBase):
    pass

class TeamMembershipUpdate(BaseModel):
    role: Optional[TeamRole] = None

class TeamMembership(TeamMembershipBase):
    id: int
    team_id: int
    joined_at: datetime
    team_name: Optional[str] = None
    team_description: Optional[str] = None
    
    class Config:
        from_attributes = True

# Team invitation schemas
class TeamInvitationBase(BaseModel):
    email: EmailStr
    role: TeamRole = TeamRole.MEMBER

class TeamInvitationCreate(TeamInvitationBase):
    team_id: int

class TeamInvitationUpdate(BaseModel):
    role: Optional[TeamRole] = None

class TeamInvitation(TeamInvitationBase):
    id: int
    team_id: int
    token: str
    created_at: datetime
    expires_at: datetime
    is_accepted: bool = False
    accepted_at: Optional[datetime] = None
    invited_by_user_id: str
    invited_by_name: Optional[str] = None
    
    class Config:
        from_attributes = True

# Extended team schema with members
class TeamWithMembers(Team):
    members: List[TeamMembership] = []
    invitations: List[TeamInvitation] = []
