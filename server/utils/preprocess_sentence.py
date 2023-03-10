import re


def preprocess_sentence(sen: str):
    '''Cleans text data up, leaving only 2 or more char long non-stepwords composed of A-Z & a-z only
    in lowercase'''

    sentence = sen.lower()

    # Remove RT
    sentence = re.sub('RT @w+: ', " ", sentence)

    # Remove special characters
    sentence = re.sub(
        "(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(w+://S+)", " ", sentence)

    # Single character removal
    # When we remove apostrophe from the word "Mark's", the apostrophe is replaced by an empty space. Hence, we are left with single character "s" that we are removing here.
    sentence = re.sub(r"\s+[a-zA-Z]\s+", ' ', sentence)

    # Remove multiple spaces
    # Next, we remove all the single characters and replace it by a space which creates multiple spaces in our text. Finally, we remove the multiple spaces from our text as well.
    sentence = re.sub(r'\s+', ' ', sentence)

    return sentence
