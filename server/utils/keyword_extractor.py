from os import path
from abc import ABC, abstractmethod
import nltk
import spacy
import yake
from rake_nltk import Rake

nltk_data_path = '../env/nltk_data'

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
    def extract(self, text: str) -> list:
        pass


class SpacyKeywordExtractor(KeywordExtractor):
    """
    Clase que implementa la interfaz KeywordExtractor para extraer palabras clave con Spacy.
    """

    def __init__(self):
        self.nlp = spacy.load("en_core_sci_lg")

    def extract(self, text: str) -> list:
        doc = self.nlp(text)
        return [ent.text for ent in doc.ents]


class YakeKeywordExtractor(KeywordExtractor):
    """
    Clase que implementa la interfaz KeywordExtractor para extraer palabras clave con Yake.
    """

    def __init__(self, lan='es', max_ngram_size: int = 3, deduplication_threshold: float = 0.9, numOfKeywords: int = 20):
        self.lan = lan
        self.max_ngram_size = max_ngram_size
        self.deduplication_threshold = deduplication_threshold
        self.numOfKeywords = numOfKeywords
        self.kw_extractor = yake.KeywordExtractor(
            lan=self.lan,
            n=self.max_ngram_size,
            dedupLim=self.deduplication_threshold,
            top=self.numOfKeywords,
        )

    def extract(self, text: str) -> list:
        return list(map(lambda x: x[0], self.kw_extractor.extract_keywords(text)))


class RateKeywordExtractor(KeywordExtractor):
    def __init__(self):
        self.rate = Rake()

    def extract(self, text: str) -> list:
        self.rate.extract_keywords_from_text(text)
        return self.rate.get_ranked_phrases()


text = """spaCy es una biblioteca de software de código abierto para el procesamiento avanzado del lenguaje natural,
escrito en los lenguajes de programación Python y Cython. La biblioteca se publica bajo la licencia MIT
y sus principales desarrolladores son Matthew Honnibal e Inés Montani, los fundadores de la compañía de software Explosion."""

# print('SpacyKeywordExtractor', SpacyKeywordExtractor().extract(text))
# print('YakeKeywordExtractor:', YakeKeywordExtractor().extract(text))
# print('RateKeywordExtractor:', RateKeywordExtractor().extract(text))
