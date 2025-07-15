from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.models.team import Team, TeamMembership
from app.schemas.team import (
    TeamMembership as TeamMembershipSchema,
    TeamMembershipCreate,
    TeamMembershipUpdate,
    TeamRole
)
from app.models.base import get_db

router = APIRouter()

# Add a member to a team
@router.post("/teams/{team_id}/members", response_model=TeamMembershipSchema)
async def add_team_member(
    team_id: int,
    member: TeamMembershipCreate,
    db: Session = Depends(get_db)
):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Check if user is already a member
    existing_membership = db.query(TeamMembership).filter(
        TeamMembership.team_id == team_id,
        TeamMembership.user_id == member.user_id
    ).first()
    
    if existing_membership:
        raise HTTPException(status_code=400, detail="User is already a member of this team")
    
    # Create membership
    db_membership = TeamMembership(
        team_id=team_id,
        user_id=member.user_id,
        role=member.role,
        user_name=member.user_name,
        user_email=member.user_email
    )
    db.add(db_membership)
    db.commit()
    db.refresh(db_membership)
    return db_membership

# Get all members of a team
@router.get("/teams/{team_id}/members", response_model=List[TeamMembershipSchema])
async def get_team_members(team_id: int, db: Session = Depends(get_db)):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    members = db.query(TeamMembership).filter(TeamMembership.team_id == team_id).all()
    return members

# Update a team member's role
@router.put("/teams/{team_id}/members/{user_id}", response_model=TeamMembershipSchema)
async def update_team_member(
    team_id: int,
    user_id: str,
    member_update: TeamMembershipUpdate,
    db: Session = Depends(get_db)
):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Find the membership
    membership = db.query(TeamMembership).filter(
        TeamMembership.team_id == team_id,
        TeamMembership.user_id == user_id
    ).first()
    
    if not membership:
        raise HTTPException(status_code=404, detail="Member not found in team")
    
    # Update the membership
    for key, value in member_update.dict(exclude_unset=True).items():
        setattr(membership, key, value)
    
    db.commit()
    db.refresh(membership)
    return membership

# Remove a member from a team
@router.delete("/teams/{team_id}/members/{user_id}")
async def remove_team_member(team_id: int, user_id: str, db: Session = Depends(get_db)):
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Find the membership
    membership = db.query(TeamMembership).filter(
        TeamMembership.team_id == team_id,
        TeamMembership.user_id == user_id
    ).first()
    
    if not membership:
        raise HTTPException(status_code=404, detail="Member not found in team")
    
    # Don't allow removing the last owner
    if membership.role == TeamRole.OWNER:
        owner_count = db.query(TeamMembership).filter(
            TeamMembership.team_id == team_id,
            TeamMembership.role == TeamRole.OWNER
        ).count()
        
        if owner_count <= 1:
            raise HTTPException(
                status_code=400,
                detail="Cannot remove the last owner from a team"
            )
    
    db.delete(membership)
    db.commit()
    return {"message": "Member removed from team successfully"}

# Get teams for a specific user
@router.get("/users/{user_id}/teams", response_model=List[TeamMembershipSchema])
async def get_user_teams(user_id: str, db: Session = Depends(get_db)):
    memberships = db.query(TeamMembership).filter(
        TeamMembership.user_id == user_id
    ).all()
    return memberships
