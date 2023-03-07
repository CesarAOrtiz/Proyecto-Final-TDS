from typing import Callable, Optional
from abc import ABC, abstractmethod
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
from .analysis_data_structure import Sentence
from .preprocess_sentence import preprocess_sentence
from .extractor_factory import KeywordExtractor, IKeywordExtractorFactory, KeywordExtractorFactory


class SentimentAnalyzer(ABC):
    """
    Interfaz que define los métodos que deben implementarse para realizar un análisis de sentimiento.
    """
    text_preprocessor: Callable[[str], str]
    _keyword_extractor: KeywordExtractor

    @abstractmethod
    def analyze(self, text: str) -> Sentence:
        """
        Analiza el sentimiento del texto de entrada y devuelve un objeto de tipo Sentence.

        Args:
            text (str): El texto a analizar.

        Returns:
            Sentence: Un objeto de tipo Sentence que contiene el resultado del análisis de sentimiento.
        """


class VADERAnalyzer(SentimentAnalyzer):
    """
    Clase concreta que implementa la interfaz SentimentAnalyzer utilizando el analizador de sentimiento VADER.
    """
    # text_preprocessor: Callable[[str], str]
    # keyword_extractor: KeywordExtractor

    def __init__(self,
                 text_preprocessor: Optional[Callable[[str], str]] = None,
                 extractor_factory: Optional[IKeywordExtractorFactory] = None,
                 ):
        """
        Inicializa una nueva instancia de VADERAnalyzer.

        Args:
            text_preprocessor (Optional[Callable[[str], str]], optional): Una función para preprocesar el texto de entrada.
                Si no se proporciona, se utiliza la función preprocess_sentence. Defaults to None.
            extractor_factory (Optional[IKeywordExtractorFactory], optional): Una fábrica de extractores de palabras clave.
                Si no se proporciona, se utiliza la fábrica KeywordExtractorFactory para crear un extractor de palabras clave
                Yake. Defaults to None.
        """
        self.text_preprocessor = text_preprocessor or preprocess_sentence
        self._keyword_extractor = extractor_factory.create_extractor(
        ) if extractor_factory else KeywordExtractorFactory.create_extractor('yake')

    def analyze(self, sentence: str, ky_extractor: Optional[str] = None) -> Sentence:
        """
        Analiza la polaridad de la oración proporcionada y devuelve una instancia de la clase Sentence.

        Args:
            sentence (str): La oración a analizar.
            ky_extractor (Optional[str], opcional): El tipo de extractor de palabras clave a utilizar.
                Si se proporciona, se utilizará en lugar del extractor que se haya establecido en el constructor.
                Por defecto es None.

        Returns:
            Una instancia de la clase Sentence con los resultados del análisis.
        """
        text = self.text_preprocessor(sentence)
        score = SentimentIntensityAnalyzer().polarity_scores(text)
        compound = score['compound']
        sentiment = "negative" if compound <= \
            -0.05 else "positive" if compound >= 0.05 else "neutral"

        if ky_extractor:
            self._keyword_extractor = KeywordExtractorFactory.create_extractor(
                ky_extractor)
        keywords = self._keyword_extractor.extract(sentence)

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
