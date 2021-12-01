const TWITTER_API_SEARCH_PARAMS_QUERY = {
	// If you have Essential or Elevated access, you can use the Basic operators
	// when building your query and can make queries up to 512 characters long.
	// If you have been approved for Academic Research access, you can use all
	// available operators and can make queries up to 1,024 characters long.
	"query": "",

	// YYYY-MM-DDTHH:mm:ssZ (ISO 8601/RFC 3339)
	"end_time": "",

	// author_id,referenced_tweets.id,referenced_tweets.id.author_id,
	// entities.mentions.username,attachments.poll_ids,
	// attachments.media_keys,in_reply_to_user_id,geo.place_id
	"expansions": "author_id,geo.place_id,attachments.poll_ids",

	// default: 10
	"max_results": 0,

	// alt_text,duration_ms,height,media_key,non_public_metrics,
	// organic_metrics,preview_image_url,promoted_metrics,
	// public_metrics,type,url,width
	// @REQUIRES: expansions=attachments.media_keys
	"media.fields": "",

	// This parameter is used to get the next 'page' of results.
	// The value used with the parameter is pulled directly from the
	// response provided by the API, and should not be modified.
	"next_token": "",

	// contained_within,country,country_code,full_name,geo,id,name,place_type
	// @REQUIRES: expansions=geo.place_id
	"place.fields": "full_name,id,contained_within,country,country_code,geo,name,place_type",

	// duration_minutes,end_datetime,id,options,voting_status
	// @REQUIRES: expansions=attachments.poll_ids
	"poll.fields": "duration_minutes,end_datetime,id,options,voting_status",

	// Returns results with a Tweet ID greater than (that is, more recent than) the
	// specified ID. The ID specified is exclusive and responses will not include it
	"since_id": "",

	// YYYY-MM-DDTHH:mm:ssZ (ISO 8601/RFC 3339)
	"start_time": "",

	// attachments,author_id,context_annotations,conversation_id,
	// created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,
	// organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,
	// referenced_tweets,reply_settings,source,text,withheld
	// @SEE: expansions=referenced_tweets.id (To return the specified fields
	// for both the original Tweet and any included referenced Tweets)
	// @DOC: https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
	"tweet.fields": "text,id,author_id,created_at,entities,geo,public_metrics",

	// Returns results with a Tweet ID less than (that is, older than) the
	// specified ID. The ID specified is exclusive and responses will not include it
	"until_id": "",

	// created_at,description,entities,id,location,name,pinned_tweet_id,
	// profile_image_url,protected,public_metrics,url,username,verified,withheld
	// @SEE: expansions=author_id,entities.mentions.username,in_reply_to_user_id,
	// referenced_tweets.id.author_id (To return the desired user fields)
	"user.fields": "username,name,id,profile_image_url,location",
}

export default TWITTER_API_SEARCH_PARAMS_QUERY
