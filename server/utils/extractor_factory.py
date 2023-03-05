from abc import ABC, abstractmethod
import yake
from rake_nltk import Rake
from .extractor import KeywordExtractor, YakeExtractor, RakeExtractor


class KeywordExtractorFactory(ABC):
    """
    Clase creadora abstracta que define el método para crear un objeto del producto KeywordExtractor.
    """

    @abstractmethod
    def create_extractor(self) -> KeywordExtractor:
        pass


class YakeExtractorFactory(KeywordExtractorFactory):
    """
    Clase creadora concreta que implementa el método para crear un objeto del producto KeywordExtractor
    usando la implementación de YakeExtractor.
    """

    def create_extractor(self) -> KeywordExtractor:
        return YakeExtractor(
            yake.KeywordExtractor(
                lan="es",
                n=3,
                dedupLim=0.3,
                top=20,
            )
        )


class RakeExtractorFactory(KeywordExtractorFactory):
    """
    Clase creadora concreta que implementa el método para crear un objeto del producto KeywordExtractor
    usando la implementación de RakeExtractor.
    """

    def create_extractor(self) -> KeywordExtractor:
        return RakeExtractor(
            Rake(language="spanish")
        )


if __name__ == "__main__":
    # Ejemplo de uso
    yake_factory = YakeExtractorFactory()
    rake_factory = RakeExtractorFactory()

    yake_extractor = yake_factory.create_extractor()
    rake_extractor = rake_factory.create_extractor()

    text = """Aníbal Garcia Duvergué, Ex aliado del PRM y presidente del Partido de Unidad de Movimientos Independientes, muestran apoyo al próximo presidente, @LeonelFernandez, tras considerar que Luis Abinader ha engañado al pueblo dominicano"""
    yake_keywords = yake_extractor.extract(text)
    rake_keywords = rake_extractor.extract(text)

    print('text:', text)
    print('yake_keywords:', yake_keywords)
    print('rake_keywords:', rake_keywords)
