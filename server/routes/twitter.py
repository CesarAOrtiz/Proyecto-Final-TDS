from fastapi import APIRouter
from tweepy import Response
from ..utils import async_client
from ..utils.process_tweet import add_tweet_sentiment

router = APIRouter()

# para obtener los replies de un tweet
# conversation_id:{tweet_id}


@router.get("", description="Get tweets")
async def get_tweets(query: str):
    recent_tweets = await async_client.search_recent_tweets(query=f'{query} -is:retweet',
                                                            max_results=100,
                                                            tweet_fields=[
                                                                'created_at', 'lang', 'geo', 'conversation_id',
                                                                # 'in_reply_to_user_id',
                                                                # 'referenced_tweets',
                                                                'public_metrics'
                                                                # 'non_public_metrics'
                                                            ],
                                                            expansions=[
                                                                'author_id',
                                                                # 'in_reply_to_user_id',
                                                                # 'referenced_tweets.id',
                                                                # 'geo.place_id'
                                                            ],
                                                            user_fields=[
                                                                'location', 'verified'],
                                                            place_fields=['country', 'country_code', 'full_name', 'geo', 'id', 'name', 'place_type'])

    if isinstance(recent_tweets, Response) and recent_tweets.meta['result_count'] > 0:
        tweets = [dict(tweet=rctweet, user=user.username)
                  for rctweet, user in
                  zip(
                      map(lambda tweet: add_tweet_sentiment(dict(tweet)),
                          recent_tweets.data),
                      recent_tweets.includes['users'])
                  ]
        return tweets

    return []
