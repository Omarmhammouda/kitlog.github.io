from fastapi import APIRouter

from .endpoints import items, users, signups

api_router = APIRouter()

api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(signups.router, prefix="/signups", tags=["signups"])

@api_router.get("/example")
async def example():
    return {"message": "This is an example endpoint"}

