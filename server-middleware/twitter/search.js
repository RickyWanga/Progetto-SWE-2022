import twitter from "./twitter-api.js"

const TWITTER_SEARCH_PARAMS = {
	endpoint: "/1.1/search/tweets.json",
	count: twitter.getPageSize(),
	result_type: "recent",
}

const getData = ( response = {} ) => {
	const data = response.data || {}
	if ( 200 !== response.status ) {
		data.error = {
			status: response.status,
			message: response.statusText,
		}
	}
	return data
}

const getDataError = ( error = {} ) => {
	const data = {
		message: error.message,
	}
	try {
		data.message = error.response.data.errors[ 0 ].message
		data.message = data.message || error.response.data.reason
	} finally {
		data.status = error.response && error.response.status
	}
	return data
}

/**
 *
 * @param {string} query
 * @returns {Promise} tweets{}
 */
const fetchTweets = ( query ) => {
	let data = {}
	return new Promise(( resolve ) => {
		twitter.api().get( TWITTER_SEARCH_PARAMS.endpoint, { params: {
			count: TWITTER_SEARCH_PARAMS.count,
			q: query,
			result_type: TWITTER_SEARCH_PARAMS.result_type,
		}}).then(( response ) => {
			data = getData( response )
		}).catch(( error ) => {
			data = getDataError( error )
		}).finally(() => {
			resolve( data )
		})
	})
}

export default {

	path: "/twitter/search",

	async handler( req, res ) {
		const query = twitter.getUrlApiParam( "query", req )
		const data = await fetchTweets( query )
		const data_json = JSON.stringify( data )
		res.writeHead( 200, { "Content-Type": "application/json" })
		res.end( data_json )
	}
}
