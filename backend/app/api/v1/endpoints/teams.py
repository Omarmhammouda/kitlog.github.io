from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.models.team import Team, TeamMembership, TeamInvitation
from app.schemas.team import (
    Team as TeamSchema, TeamCreate, TeamUpdate, TeamWithMembers,
    TeamMembership as TeamMembershipSchema, TeamMembershipCreate, 
    TeamInvitation as TeamInvitationSchema,
)
from app.models.base import get_db

router = APIRouter()

# Create a new team
@router.post("/", response_model=TeamSchema)
async def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    db_team = Team(**team.dict())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

# Get all teams
@router.get("/", response_model=List[TeamWithMembers])
async def get_teams(db: Session = Depends(get_db)):
    return db.query(Team).all()

# Get a specific team by ID
@router.get("/{team_id}", response_model=TeamWithMembers)
async def get_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

# Update a team
@router.put("/{team_id}", response_model=TeamSchema)
async def update_team(team_id: int, team_update: TeamUpdate, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    for key, value in team_update.dict(exclude_unset=True).items():
        setattr(team, key, value)
    db.commit()
    db.refresh(team)
    return team

# Delete a team
@router.delete("/{team_id}")
async def delete_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    db.delete(team)
    db.commit()
    return {"message": "Team deleted successfully"}

