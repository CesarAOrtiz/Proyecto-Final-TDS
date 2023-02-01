import tweepy
from tweepy.asynchronous import AsyncClient

consumer_key = 'ImGK6XiE4b2VgNlGfMO3J5O3I'
consumer_secret = 'fnkmexUjUfiGfTa7yFLWqZY1swV1NJbfia3M9uVjBHJQKgtHkv'
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAHBOkQEAAAAAbFEs45qSVgMYsEVogQxPk9NxUHA%3DKgpRZCJxYZfTSz8K0D4SxkrHaLuh4QMoxS6LeumMdSmPjzGzZn'
access_token = '1420432654646890506-JMgm4g9sj0h4jtm1aceI1WHF6XkjJT'
access_token_secret = 'T1J1AV6sul8AHsxXAahqrHr6OYgOLAjDMdsSpFspBMnwL'

client = tweepy.Client(
    bearer_token,
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret
)


def get_tweet_conversation():
    pass


def get_recent_tweets():
    pass


def get_tweets_count():
    pass


async_client = AsyncClient(bearer_token,
                           consumer_key,
                           consumer_secret,
                           access_token,
                           access_token_secret)
