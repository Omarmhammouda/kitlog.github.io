from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from typing import List

from app.models.team import Team
from app.models.user import User
from app.schemas.team import (
    Team as TeamSchema, TeamCreate, TeamUpdate, TeamWithMembers
)
from app.models.base import get_db
from app.services.auth_service import AuthService
from app.services.team_service import TeamService
from app.core.config import settings
import requests

router = APIRouter()
security = HTTPBearer()


async def get_current_user(token: str = Depends(security), db: Session = Depends(get_db)) -> User:
    """
    Dependency to get current user from token.
    This could be moved to a separate dependencies file.
    """
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
        
        return current_user
        
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=500, detail="Failed to connect to Auth0")
    except Exception:
        raise HTTPException(status_code=500, detail="Authentication failed")


# Create a new team
@router.post("/", response_model=TeamSchema)
async def create_team(
    team: TeamCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new team. The creator becomes the team owner."""
    try:
        return TeamService.create_team(team, current_user, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create team")


# Get all teams
@router.get("/", response_model=List[TeamWithMembers])
async def get_teams(db: Session = Depends(get_db)):
    """Get all active teams."""
    return TeamService.get_all_teams(db)


# Get a specific team by ID
@router.get("/{team_id}", response_model=TeamWithMembers)
async def get_team(team_id: int, db: Session = Depends(get_db)):
    """Get a specific team by ID."""
    team = TeamService.get_team_by_id(team_id, db)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


# Update a team
@router.put("/{team_id}", response_model=TeamSchema)
async def update_team(
    team_id: int, 
    team_update: TeamUpdate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a team. Only team owners and admins can update."""
    # Check permission
    if not TeamService.check_user_team_permission(
        current_user.id, team_id, ["owner", "admin"], db
    ):
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    team = TeamService.update_team(team_id, team_update, db)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


# Delete a team
@router.delete("/{team_id}")
async def delete_team(
    team_id: int, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a team. Only team owners can delete."""
    success = TeamService.delete_team(team_id, current_user, db)
    if not success:
        raise HTTPException(status_code=404, detail="Team not found or insufficient permissions")
    return {"message": "Team deleted successfully"}


# Get user's teams
@router.get("/users/{user_id}/teams", response_model=List[TeamSchema])
async def get_user_teams(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all teams a user is a member of."""
    # Users can only see their own teams unless they're admin
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    return TeamService.get_user_teams(user_id, db)
