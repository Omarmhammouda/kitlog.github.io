from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from typing import List

from app.models.team import Team, TeamMembership, TeamInvitation
from app.models.user import User
from app.schemas.team import (
    Team as TeamSchema, TeamCreate, TeamUpdate, TeamWithMembers,
    TeamMembership as TeamMembershipSchema, TeamMembershipCreate, 
    TeamInvitation as TeamInvitationSchema,
)
from app.models.base import get_db
from app.services.auth_service import AuthService
from app.core.config import settings
import requests

router = APIRouter()
security = HTTPBearer()

# Create a new team
@router.post("/", response_model=TeamSchema)
async def create_team(
    team: TeamCreate, 
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    # Get current user from token
    try:
        auth0_user_info_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
        user_info_response = requests.get(
            auth0_user_info_url,
            headers={"Authorization": f"Bearer {token.credentials}"}
        )
        
        if user_info_response.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user_info = user_info_response.json()
        auth0_id = user_info.get('sub')
        
        # Get user from local database
        current_user = AuthService.get_user_by_auth0_id(auth0_id, db)
        if not current_user:
            # Sync user if not exists
            current_user = AuthService.sync_user_from_auth0(user_info, db)
        
        # Create the team
        db_team = Team(**team.dict())
        db.add(db_team)
        db.commit()
        db.refresh(db_team)
        
        # Add creator as team owner
        team_membership = TeamMembership(
            user_id=current_user.id,
            team_id=db_team.id,
            role="owner"
        )
        db.add(team_membership)
        db.commit()
        
        return db_team
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Failed to connect to Auth0")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

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

