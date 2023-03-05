from os import path
from abc import ABC, abstractmethod
from typing import List
import nltk
import yake
from rake_nltk import Rake

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


class YakeExtractor(KeywordExtractor):
    """
    Clase que implementa la interfaz KeywordExtractor para extraer palabras clave con Yake.
    """

    def __init__(self, language: str = 'es', max_ngram_size: int = 3, deduplication_threshold: float = 0.3, max_num_keywords: int = 20):
        """
        Inicializa un extractor de palabras clave con Yake.

        :param language: El idioma del texto.
        :param max_ngram_size: El tamaño máximo de los n-gramas para Yake.
        :param deduplication_threshold: El umbral de deduplicación para Yake.
        :param max_num_keywords: El número máximo de palabras clave a extraer.
        """
        self._extractor = yake.KeywordExtractor(
            lan=language,
            n=max_ngram_size,
            dedupLim=deduplication_threshold,
            top=max_num_keywords,
        )

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

    def __init__(self, language: str = 'spanish'):
        """
        Inicializa un extractor de palabras clave con Rake.

        :param language: El idioma del texto.
        """
        self._extractor = Rake(language=language)

    def extract(self, text: str) -> List[str]:
        """
        Extrae palabras clave del texto usando Rake.

        :param text: El texto del cual extraer las palabras clave.
        :return: Una lista de las palabras clave extraídas.
        """
        self._extractor.extract_keywords_from_text(text)
        return self._extractor.get_ranked_phrases()


if __name__ == '__main__':
    text = """spaCy es una biblioteca de software de código abierto para el procesamiento avanzado del lenguaje natural,
    escrito en los lenguajes de programación Python y Cython. La biblioteca se publica bajo la licencia MIT
    y sus principales desarrolladores son Matthew Honnibal e Inés Montani, los fundadores de la compañía de software Explosion."""

    print('YakeExtractor:', YakeExtractor().extract(text))
    print('RateKeywordExtractor:', RakeExtractor().extract(text))
