from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from app.schemas.user import User as UserSchema
from app.services.auth_service import AuthService
from app.models.base import get_db
from app.core.config import settings
import requests

router = APIRouter()
security = HTTPBearer()


@router.post("/sync", response_model=UserSchema)
async def sync_user_on_login(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Sync user info from Auth0 when they log in, using their JWT token.
    This should be called from the frontend after successful Auth0 login.
    """
    try:
        # Get user info from Auth0 using the token
        auth0_user_info_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
        
        user_info_response = requests.get(
            auth0_user_info_url,
            headers={"Authorization": f"Bearer {token.credentials}"}
        )

        if user_info_response.status_code != 200:
            raise HTTPException(
                status_code=401, 
                detail="Could not retrieve user information from Auth0"
            )

        user_info = user_info_response.json()

        # Sync with local database
        user = AuthService.sync_user_from_auth0(user_info, db)
        
        return user

    except requests.exceptions.RequestException as e:
        print(f"Auth0 API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to connect to Auth0")
    except Exception as e:
        print(f"Login Sync Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/me", response_model=UserSchema)
async def get_current_user(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Get current user information from the database using Auth0 token.
    """
    try:
        # Get user info from Auth0 using the token
        auth0_user_info_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
        
        user_info_response = requests.get(
            auth0_user_info_url,
            headers={"Authorization": f"Bearer {token.credentials}"}
        )

        if user_info_response.status_code != 200:
            raise HTTPException(
                status_code=401, 
                detail="Invalid token"
            )

        user_info = user_info_response.json()
        auth0_id = user_info.get('sub')

        # Get user from local database
        user = AuthService.get_user_by_auth0_id(auth0_id, db)
        
        if not user:
            # User not in local database, sync them
            user = AuthService.sync_user_from_auth0(user_info, db)
        
        return user

    except requests.exceptions.RequestException as e:
        print(f"Auth0 API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to connect to Auth0")
    except Exception as e:
        print(f"Get Current User Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/complete-onboarding")
async def complete_onboarding(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Mark user's onboarding as complete.
    """
    try:
        # Get user info from Auth0 using the token
        auth0_user_info_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
        
        user_info_response = requests.get(
            auth0_user_info_url,
            headers={"Authorization": f"Bearer {token.credentials}"}
        )

        if user_info_response.status_code != 200:
            raise HTTPException(
                status_code=401, 
                detail="Invalid token"
            )

        user_info = user_info_response.json()
        auth0_id = user_info.get('sub')

        # Get user from local database
        user = AuthService.get_user_by_auth0_id(auth0_id, db)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Mark onboarding as complete
        user = AuthService.mark_onboarding_complete(user.id, db)
        
        return {"message": "Onboarding completed successfully", "user": user}

    except requests.exceptions.RequestException as e:
        print(f"Auth0 API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to connect to Auth0")
    except Exception as e:
        print(f"Complete Onboarding Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
