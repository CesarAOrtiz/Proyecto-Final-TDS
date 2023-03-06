from os import path
from abc import ABC, abstractmethod
from typing_extensions import Protocol, runtime_checkable
from typing import List
import nltk

nltk_data_path = path.join(path.dirname(__file__), '..\\env\\nltk_data')

if not path.exists(f'{nltk_data_path}/sentiment/vader_lexicon.zip'):
    nltk.download('vader_lexicon', nltk_data_path)

if not path.exists(f'{nltk_data_path}/corpora/stopwords.zip'):
    nltk.download('stopwords', nltk_data_path)

if not path.exists(f'{nltk_data_path}/tokenizers/punkt.zip'):
    nltk.download('punkt', nltk_data_path)


class KeywordExtractor(ABC):
    """
    Interfaz que define los métodos que deben implementarse para extraer palabras clave.
    """

    @abstractmethod
    def extract(self, text: str) -> List[str]:
        """
        Método abstracto que debe ser implementado para extraer palabras clave.

        :param text: El texto del cual extraer las palabras clave.
        :return: Una lista de las palabras clave extraídas.
        """


@runtime_checkable
class IYakeExtractor(Protocol):
    @abstractmethod
    def extract_keywords(self, text: str) -> (List):
        pass


@runtime_checkable
class IRakeExtractor(Protocol):
    @abstractmethod
    def extract_keywords_from_text(self, text: str):
        pass

    @abstractmethod
    def get_ranked_phrases(self) -> List[str]:
        pass


class YakeExtractor(KeywordExtractor):
    """
    Clase que implementa la interfaz KeywordExtractor para extraer palabras clave con Yake.
    """

    def __init__(self, extractor: IYakeExtractor):
        self._extractor = extractor

    def extract(self, text: str) -> List[str]:
        """
        Extrae palabras clave del texto usando Yake.

        :param text: El texto del cual extraer las palabras clave.
        :return: Una lista de las palabras clave extraídas.
        """
        return list(map(lambda x: x[0], self._extractor.extract_keywords(text)))


class RakeExtractor(KeywordExtractor):
    """
    Clase que implementa la interfaz KeywordExtractor para extraer palabras clave con Rake.
    """

    def __init__(self, extractor: IRakeExtractor):
        self._extractor = extractor

    def extract(self, text: str) -> List[str]:
        """
        Extrae palabras clave del texto usando Rake.

        :param text: El texto del cual extraer las palabras clave.
        :return: Una lista de las palabras clave extraídas.
        """
        self._extractor.extract_keywords_from_text(text)
        return self._extractor.get_ranked_phrases()
