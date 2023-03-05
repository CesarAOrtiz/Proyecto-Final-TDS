from dataclasses import dataclass
from typing import List


@dataclass
class Analysis:
    """
    A data class representing the sentiment analysis of a sentence.

    Attributes:
        sentiment (str): The sentiment of the sentence.
        score (float): The sentiment score of the sentence.
        polarity (float): The polarity of the sentence.
        subjectivity (float): The subjectivity of the sentence.
    """
    sentiment: str
    score: float
    polarity: float
    subjectivity: float


@dataclass
class Sentence(Analysis):
    """
    A data class representing a sentence and its sentiment analysis.

    Attributes:
        text (str): The original sentence text.
        keywords (List[str]): The extracted keywords from the sentence.
    """
    text: str
    keywords: List[str]
    # word_counts: dict
