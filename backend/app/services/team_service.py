from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.team import Team, TeamMembership, TeamInvitation
from app.models.user import User
from app.schemas.team import TeamCreate, TeamUpdate
from datetime import datetime

class TeamService:
    
    @staticmethod
    def create_team(team_data: TeamCreate, current_user: User, db: Session) -> Team:
        """
        Create a new team and add the creator as owner.
        
        Args:
            team_data: Team creation data
            current_user: User creating the team
            db: Database session
            
        Returns:
            Team: The created team
        """
        try:
            # Create the team
            db_team = Team(**team_data.dict())
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
            
        except Exception as e:
            db.rollback()
            raise e
    
    @staticmethod
    def get_all_teams(db: Session) -> List[Team]:
        """Get all teams."""
        return db.query(Team).filter(Team.is_active == True).all()
    
    @staticmethod
    def get_team_by_id(team_id: int, db: Session) -> Optional[Team]:
        """Get a team by ID."""
        return db.query(Team).filter(
            Team.id == team_id, 
            Team.is_active == True
        ).first()
    
    @staticmethod
    def update_team(team_id: int, team_update: TeamUpdate, db: Session) -> Optional[Team]:
        """
        Update a team.
        
        Args:
            team_id: ID of team to update
            team_update: Update data
            db: Database session
            
        Returns:
            Team: Updated team or None if not found
        """
        team = TeamService.get_team_by_id(team_id, db)
        if not team:
            return None
            
        # Update only provided fields
        for key, value in team_update.dict(exclude_unset=True).items():
            setattr(team, key, value)
        
        team.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(team)
        return team
    
    @staticmethod
    def delete_team(team_id: int, current_user: User, db: Session) -> bool:
        """
        Soft delete a team (mark as inactive).
        Only team owners can delete teams.
        
        Args:
            team_id: ID of team to delete
            current_user: User requesting deletion
            db: Database session
            
        Returns:
            bool: True if deleted, False if not found or unauthorized
        """
        team = TeamService.get_team_by_id(team_id, db)
        if not team:
            return False
        
        # Check if current user is team owner
        membership = db.query(TeamMembership).filter(
            TeamMembership.team_id == team_id,
            TeamMembership.user_id == current_user.id,
            TeamMembership.role == "owner"
        ).first()
        
        if not membership:
            return False
        
        # Soft delete (mark as inactive)
        team.is_active = False
        team.updated_at = datetime.utcnow()
        db.commit()
        
        return True
    
    @staticmethod
    def get_user_teams(user_id: int, db: Session) -> List[Team]:
        """Get all teams a user is a member of."""
        memberships = db.query(TeamMembership).filter(
            TeamMembership.user_id == user_id
        ).all()
        
        team_ids = [m.team_id for m in memberships]
        return db.query(Team).filter(
            Team.id.in_(team_ids),
            Team.is_active == True
        ).all()
    
    @staticmethod
    def check_user_team_permission(user_id: int, team_id: int, required_roles: List[str], db: Session) -> bool:
        """
        Check if user has required role in team.
        
        Args:
            user_id: User ID to check
            team_id: Team ID to check
            required_roles: List of roles that grant permission (e.g., ["owner", "admin"])
            db: Database session
            
        Returns:
            bool: True if user has permission
        """
        membership = db.query(TeamMembership).filter(
            TeamMembership.user_id == user_id,
            TeamMembership.team_id == team_id,
            TeamMembership.role.in_(required_roles)
        ).first()
        
        return membership is not None
