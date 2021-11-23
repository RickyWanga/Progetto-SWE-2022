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
	let tweets = {}
	return new Promise(( resolve ) => {
		twitter.api().get( TWITTER_SEARCH_PARAMS.endpoint, { params: {
			count: TWITTER_SEARCH_PARAMS.count,
			q: query,
			result_type: TWITTER_SEARCH_PARAMS.result_type,
		}}).then(( response ) => {

			tweets = response.data

			// HTTP Error
			if ( 200 !== response.status ) {
				tweets.error = {
					status: response.status,
					message: response.statusText,
				}
			}
		}).catch(( error ) => {
			// All others errors
			tweets.error = {
				message: error.message
			}
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
