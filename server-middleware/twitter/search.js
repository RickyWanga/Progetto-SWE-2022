import twitter from "./twitter-api.js"

const TWITTER_SEARCH_PARAMS = {
	endpoint: "/1.1/search/tweets.json",
	count: 100,
	result_type: "recent",
}

/**
 * @TODO next_results
 *
 * @param {string} query
 * @returns {Promise} tweets{}
 */
const fetchTweets = ( query ) => {
	var tweets = {}
	return new Promise(( resolve ) => {
		twitter.api().get( TWITTER_SEARCH_PARAMS.endpoint, { params: {
			count: TWITTER_SEARCH_PARAMS.count,
			q: query,
			result_type: TWITTER_SEARCH_PARAMS.result_type,
		}}).then(( response ) => {

			tweets = response.data

			//@TODO Handle error response in tweets.data

			// HTTP Error
			if ( 200 !== response.status ) {
				tweets.error = {
					status: response.status,
					text: response.statusText,
				}
			}
		}).catch(( error ) => {
			// All others errors
			tweets.error = error.response || error.request || error.message
		}).finally(() => {
			resolve( tweets )
		})
	})
}

export default {

	path: "/twitter/search",

	async handler( req, res ) {
		const query = twitter.getUrlApiParam( "query", req )
		const tweets = await fetchTweets( query )
		const tweets_json = JSON.stringify( tweets )
		res.writeHead( 200, { "Content-Type": "application/json" })
		res.end( tweets_json )
	}
}
