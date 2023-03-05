from dataclasses import dataclass
from abc import ABC, abstractmethod


@dataclass
class Analysis:
    """
    Clase de datos que representa una oración y su análisis de sentimiento.

    Atributos:
        sentiment (str): Una cadena que indica el sentimiento de la oración ('positive', 'negative' o 'neutral').
        score (float): Una medida de la intensidad del sentimiento, entre -1 y 1.
        polarity (float): Una medida de la polaridad del texto, entre -1 y 1.
        subjectivity (float): Una medida de la subjetividad del texto, entre 0 y 1.
    """
    sentiment: str
    score: float
    polarity: float
    subjectivity: float
    # text: str
    # text (str): La oración original.


@dataclass
class Sentence(Analysis):
    """Sentence class that holds the sentence and its sentiment"""
    text: str
    # word_counts: dict


class SentimentAnalyzer(ABC):
    """
    Interfaz que define los métodos que deben implementarse para realizar un análisis de sentimiento.
    """

    @abstractmethod
    def preprocess(self, text: str) -> str:
        pass

    @abstractmethod
    def analyze(self, text: str) -> Analysis:
        pass


class KeywordExtractor(ABC):
    """
    Interfaz que define los métodos que deben implementarse para extraer palabras clave.
    """

    @abstractmethod
    def extract(self, text: str) -> list:
        pass
