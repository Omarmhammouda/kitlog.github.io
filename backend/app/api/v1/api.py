from fastapi import APIRouter

from .endpoints import items, users, signups, equipment, admin, teams, team_memberships, team_invitations

api_router = APIRouter()

api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(signups.router, prefix="/signups", tags=["signups"])
api_router.include_router(equipment.router, prefix="/equipment", tags=["equipment"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(team_memberships.router, tags=["team-memberships"])
api_router.include_router(team_invitations.router, tags=["team-invitations"])

@api_router.get("/example")
async def example():
    return {"message": "This is an example endpoint"}

