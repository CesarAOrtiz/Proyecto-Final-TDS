from fastapi import APIRouter
from routes import twitter_router, analytics_router

router = APIRouter()
router.include_router(twitter_router, prefix="/api/twitter", tags=["Twitter"])
router.include_router(
    analytics_router, prefix="/api/analytics", tags=["Analytics"])
