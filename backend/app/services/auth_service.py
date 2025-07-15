from sqlalchemy.orm import Session
from app.models.user import User
from app.models.base import SessionLocal
from datetime import datetime
from typing import Optional
import json

class AuthService:
    
    @staticmethod
    def sync_user_from_auth0(auth0_user_data: dict, db: Session = None) -> User:
        """
        Sync user data from Auth0 to local database.
        Creates user if doesn't exist, updates if exists.
        
        Args:
            auth0_user_data: User data from Auth0 token/profile
            db: Database session (optional, will create if not provided)
            
        Returns:
            User: The created or updated user
        """
        if not db:
            db = SessionLocal()
            close_db = True
        else:
            close_db = False
            
        try:
            auth0_id = auth0_user_data.get('sub')
            email = auth0_user_data.get('email')
            
            if not auth0_id:
                raise ValueError("Auth0 user ID (sub) is required")
            
            # Check if user exists
            user = db.query(User).filter(User.auth0_id == auth0_id).first()
            
            if user:
                # Update existing user
                user.email = email or user.email
                user.name = auth0_user_data.get('name') or user.name
                user.picture = auth0_user_data.get('picture') or user.picture
                user.email_verified = auth0_user_data.get('email_verified', user.email_verified)
                user.last_login = datetime.utcnow()
                user.auth0_metadata = json.dumps(auth0_user_data)
                user.updated_at = datetime.utcnow()
            else:
                # Create new user
                user = User(
                    auth0_id=auth0_id,
                    email=email,
                    name=auth0_user_data.get('name', ''),
                    picture=auth0_user_data.get('picture'),
                    email_verified=auth0_user_data.get('email_verified', False),
                    last_login=datetime.utcnow(),
                    auth0_metadata=json.dumps(auth0_user_data),
                    has_completed_onboarding=False
                )
                db.add(user)
            
            db.commit()
            db.refresh(user)
            return user
            
        except Exception as e:
            db.rollback()
            raise e
        finally:
            if close_db:
                db.close()
    
    @staticmethod
    def get_user_by_auth0_id(auth0_id: str, db: Session = None) -> Optional[User]:
        """Get user by Auth0 ID"""
        if not db:
            db = SessionLocal()
            close_db = True
        else:
            close_db = False
            
        try:
            user = db.query(User).filter(User.auth0_id == auth0_id).first()
            return user
        finally:
            if close_db:
                db.close()
    
    @staticmethod
    def get_user_by_email(email: str, db: Session = None) -> Optional[User]:
        """Get user by email"""
        if not db:
            db = SessionLocal()
            close_db = True
        else:
            close_db = False
            
        try:
            user = db.query(User).filter(User.email == email).first()
            return user
        finally:
            if close_db:
                db.close()
    
    @staticmethod
    def mark_onboarding_complete(user_id: int, db: Session = None) -> User:
        """Mark user's onboarding as complete"""
        if not db:
            db = SessionLocal()
            close_db = True
        else:
            close_db = False
            
        try:
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                user.has_completed_onboarding = True
                user.updated_at = datetime.utcnow()
                db.commit()
                db.refresh(user)
            return user
        finally:
            if close_db:
                db.close()
