from typing import List
from fastapi import APIRouter, Query
from ..utils.process_tweet import get_sentiment

router = APIRouter()


@router.get("", description="Analyze the sentiment of a text")
async def get_tweets(text: List[str] = Query(..., description="The text to analyze")):
    return [get_sentiment(paragraph) for paragraph in text]
