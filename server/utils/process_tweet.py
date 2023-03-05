import re
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
from analysis_data_structure import Sentence
import keyword_extractor


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


def get_sentiment(sentence: str) -> Sentence:
    '''Returns the sentiment of a sentence'''
    text = preprocess_sentence(sentence)
    score = SentimentIntensityAnalyzer().polarity_scores(text)
    conpound = score['compound']
    sentiment = "negative" if conpound <= \
        -0.05 else "positive" if conpound >= 0.05 else "neutral"

    # keywords = keyword_extractor.extract_keywords(text)

    return Sentence(
        sentiment=sentiment,
        score=score['compound'],
        polarity=TextBlob(text).sentiment.polarity,  # type: ignore
        subjectivity=TextBlob(text).sentiment.subjectivity,  # type: ignore
        text=sentence,
        # word_counts=TextBlob(text).word_counts  # type: ignore
    )


def add_tweet_sentiment(tweet):
    """Adds sentiment to a tweet

    Args:
        tweet (_type_): _description_

    Returns:
        _type_: _description_
    """
    tweet['clean_text'] = preprocess_sentence(tweet['text'])
    text_blob = TextBlob(tweet['clean_text'])
    sentiment = text_blob.sentiment
    # tweet['word_counts'] = text_blob.word_counts
    tweet['polarity'] = sentiment.polarity  # type: ignore
    tweet['subjectivity'] = sentiment.subjectivity  # type: ignore
    score = SentimentIntensityAnalyzer().polarity_scores(tweet['clean_text'])
    if score['compound'] <= -0.05:
        tweet['sentiment'] = "negative"
    elif score['compound'] >= 0.05:
        tweet['sentiment'] = "positive"
    else:
        tweet['sentiment'] = "neutral"
    return tweet
