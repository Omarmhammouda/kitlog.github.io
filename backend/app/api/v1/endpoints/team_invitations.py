from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import secrets

from app.models.team import Team, TeamInvitation, TeamMembership
from app.schemas.team import (
    TeamInvitation as TeamInvitationSchema,
    TeamInvitationCreate,
    TeamInvitationUpdate,
    TeamRole,
    SubscriptionType
)
from app.models.base import get_db

router = APIRouter()

# Create a team invitation
@router.post("/teams/{team_id}/invitations", response_model=TeamInvitationSchema)
async def create_team_invitation(
    team_id: int,
    invitation: TeamInvitationCreate,
    current_user_id: str,  # In a real app, this would come from auth
    current_user_name: str = None,  # In a real app, this would come from auth
    db: Session = Depends(get_db)
):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Check if team has paid subscription for invitations
    if team.subscription_type != SubscriptionType.PAID:
        raise HTTPException(
            status_code=403,
            detail="Team invitations require a paid subscription"
        )
    
    # Check if user is already a member
    existing_membership = db.query(TeamMembership).filter(
        TeamMembership.team_id == team_id,
        TeamMembership.user_id == current_user_id
    ).first()
    
    if not existing_membership or existing_membership.role not in [TeamRole.OWNER, TeamRole.ADMIN]:
        raise HTTPException(
            status_code=403,
            detail="Only team owners and admins can send invitations"
        )
    
    # Check if there's already a pending invitation for this email
    existing_invitation = db.query(TeamInvitation).filter(
        TeamInvitation.team_id == team_id,
        TeamInvitation.email == invitation.email,
        TeamInvitation.is_accepted == False,
        TeamInvitation.expires_at > datetime.utcnow()
    ).first()
    
    if existing_invitation:
        raise HTTPException(
            status_code=400,
            detail="There is already a pending invitation for this email"
        )
    
    # Generate invitation token
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=7)  # 7 days expiry
    
    # Create invitation
    db_invitation = TeamInvitation(
        email=invitation.email,
        team_id=team_id,
        role=invitation.role,
        token=token,
        expires_at=expires_at,
        invited_by_user_id=current_user_id,
        invited_by_name=current_user_name
    )
    
    db.add(db_invitation)
    db.commit()
    db.refresh(db_invitation)
    return db_invitation

# Get all invitations for a team
@router.get("/teams/{team_id}/invitations", response_model=List[TeamInvitationSchema])
async def get_team_invitations(team_id: int, db: Session = Depends(get_db)):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    invitations = db.query(TeamInvitation).filter(
        TeamInvitation.team_id == team_id
    ).all()
    return invitations

# Get invitation by token
@router.get("/invitations/{token}", response_model=TeamInvitationSchema)
async def get_invitation_by_token(token: str, db: Session = Depends(get_db)):
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.token == token
    ).first()
    
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    if invitation.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invitation has expired")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Invitation has already been accepted")
    
    return invitation

# Accept a team invitation
@router.post("/invitations/{token}/accept")
async def accept_team_invitation(
    token: str,
    accepting_user_id: str,  # In a real app, this would come from auth
    accepting_user_name: str = None,  # In a real app, this would come from auth
    accepting_user_email: str = None,  # In a real app, this would come from auth
    db: Session = Depends(get_db)
):
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.token == token
    ).first()
    
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    if invitation.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invitation has expired")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Invitation has already been accepted")
    
    # Check if user is already a member
    existing_membership = db.query(TeamMembership).filter(
        TeamMembership.team_id == invitation.team_id,
        TeamMembership.user_id == accepting_user_id
    ).first()
    
    if existing_membership:
        raise HTTPException(status_code=400, detail="User is already a member of this team")
    
    # Create team membership
    membership = TeamMembership(
        team_id=invitation.team_id,
        user_id=accepting_user_id,
        role=invitation.role,
        user_name=accepting_user_name,
        user_email=accepting_user_email
    )
    
    # Mark invitation as accepted
    invitation.is_accepted = True
    invitation.accepted_at = datetime.utcnow()
    
    db.add(membership)
    db.commit()
    
    return {"message": "Invitation accepted successfully"}

# Cancel/delete an invitation
@router.delete("/invitations/{invitation_id}")
async def cancel_invitation(invitation_id: int, db: Session = Depends(get_db)):
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.id == invitation_id
    ).first()
    
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Cannot cancel an accepted invitation")
    
    db.delete(invitation)
    db.commit()
    return {"message": "Invitation cancelled successfully"}

# Update an invitation (e.g., change role)
@router.put("/invitations/{invitation_id}", response_model=TeamInvitationSchema)
async def update_invitation(
    invitation_id: int,
    invitation_update: TeamInvitationUpdate,
    db: Session = Depends(get_db)
):
    invitation = db.query(TeamInvitation).filter(
        TeamInvitation.id == invitation_id
    ).first()
    
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Cannot update an accepted invitation")
    
    if invitation.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Cannot update an expired invitation")
    
    # Update the invitation
    for key, value in invitation_update.dict(exclude_unset=True).items():
        setattr(invitation, key, value)
    
    db.commit()
    db.refresh(invitation)
    return invitation
