from typing import Callable, Optional
from abc import ABC, abstractmethod
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
from .analysis_data_structure import Sentence
from .preprocess_sentence import preprocess_sentence
from .extractor_factory import KeywordExtractor, KeywordExtractorFactory, YakeExtractorFactory, RakeExtractorFactory


class SentimentAnalyzer(ABC):
    """
    Interfaz que define los métodos que deben implementarse para realizar un análisis de sentimiento.
    """
    text_preprocessor: Callable[[str], str]
    keyword_extractor: KeywordExtractor

    @abstractmethod
    def analyze(self, text: str) -> Sentence:
        pass


class VADERAnalyzer(SentimentAnalyzer):
    """
    Clase concreta que implementa la interfaz SentimentAnalyzer utilizando el analizador de sentimiento VADER.
    """
    # text_preprocessor: Callable[[str], str]
    # keyword_extractor: KeywordExtractor

    def __init__(self,
                 text_preprocessor: Optional[Callable[[str], str]] = None,
                 extractor_factory: Optional[KeywordExtractorFactory] = None,
                 ):
        self.text_preprocessor = text_preprocessor or preprocess_sentence
        self.keyword_extractor = extractor_factory.create_extractor(
        ) if extractor_factory else YakeExtractorFactory().create_extractor()

    def analyze(self, sentence: str) -> Sentence:
        text = self.text_preprocessor(sentence)
        score = SentimentIntensityAnalyzer().polarity_scores(text)
        compound = score['compound']
        sentiment = "negative" if compound <= \
            -0.05 else "positive" if compound >= 0.05 else "neutral"

        keywords = self.keyword_extractor.extract(sentence)

        return Sentence(
            sentiment=sentiment,
            score=score['compound'],
            polarity=TextBlob(text).sentiment.polarity,  # type: ignore
            subjectivity=TextBlob(text).sentiment.subjectivity,  # type: ignore
            text=sentence,
            keywords=keywords
            # word_counts=TextBlob(text).word_counts  # type: ignore
        )


def add_tweet_sentiment(tweet):
    """Adds sentiment to a tweet

    Args:
        tweet (_type_): _description_

    Returns:
        _type_: _description_
    """
    sentence = VADERAnalyzer().analyze(tweet['text'])
    tweet['sentiment'] = sentence.sentiment
    tweet['score'] = sentence.score
    tweet['polarity'] = sentence.polarity
    tweet['subjectivity'] = sentence.subjectivity
    tweet['keywords'] = sentence.keywords
    # tweet['word_counts'] = text_blob.word_counts
    return tweet
