from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from app.schemas.signup import EmailSignupCreate, EmailSignupResponse
from app.models.signup import EmailSignup
from app.models.base import get_db

router = APIRouter()

@router.post("/", response_model=EmailSignupResponse)
def create_email_signup(
    signup: EmailSignupCreate,
    db: Session = Depends(get_db)
):
    """Create a new email signup"""
    try:
        db_signup = EmailSignup(
            name=signup.name,
            email=signup.email,
            source=signup.source
        )
        db.add(db_signup)
        db.commit()
        db.refresh(db_signup)
        return db_signup
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400, 
            detail="Email already registered"
        )

@router.get("/", response_model=List[EmailSignupResponse])
def get_email_signups(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all email signups (admin endpoint)"""
    signups = db.query(EmailSignup).offset(skip).limit(limit).all()
    return signups

@router.get("/count")
def get_signup_count(db: Session = Depends(get_db)):
    """Get total signup count"""
    count = db.query(EmailSignup).count()
    return {"count": count}
