from typing import List
from fastapi import APIRouter, Query
from ..utils.analyzer import VADERAnalyzer

router = APIRouter()

analyser = VADERAnalyzer()


@router.get("", description="Analyze the sentiment of a text")
async def get_tweets(text: List[str] = Query(..., description="The text to analyze"), ky_extractor: str = 'yake'):
    return [analyser.analyze(paragraph, ky_extractor) for paragraph in text]
