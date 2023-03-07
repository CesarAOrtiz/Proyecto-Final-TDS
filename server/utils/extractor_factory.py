from abc import ABC, abstractmethod
from functools import lru_cache
import yake
from rake_nltk import Rake
from .extractor import KeywordExtractor, YakeExtractor, RakeExtractor


class IKeywordExtractorFactory(ABC):
    """
    Clase creadora abstracta que define el método para crear un objeto del producto KeywordExtractor.
    """

    @abstractmethod
    def create_extractor(self) -> KeywordExtractor:
        pass


class KeywordExtractorFactory(IKeywordExtractorFactory):

    @staticmethod
    @lru_cache(maxsize=32)
    def create_extractor(extractor_type: str = 'yake') -> KeywordExtractor:
        if extractor_type == "yake":
            return YakeExtractor(yake.KeywordExtractor(
                lan="es",
                n=3,
                dedupLim=0.3,
                top=20
            ))
        elif extractor_type == "rake":
            return RakeExtractor(Rake(
                language="spanish",
                include_repeated_phrases=False
            ))
        else:
            raise ValueError("Invalid extractor type")


if __name__ == "__main__":
    # Ejemplo de uso
    factory = KeywordExtractorFactory

    yake_extractor = factory.create_extractor('yake')
    rake_extractor = factory.create_extractor('rake')

    text = """Aníbal Garcia Duvergué, Ex aliado del PRM y presidente del Partido de Unidad de Movimientos Independientes, muestran apoyo al próximo presidente, @LeonelFernandez, tras considerar que Luis Abinader ha engañado al pueblo dominicano"""
    yake_keywords = yake_extractor.extract(text)
    rake_keywords = rake_extractor.extract(text)

    print('text:', text)
    print('yake_keywords:', yake_keywords)
    print('rake_keywords:', rake_keywords)
