import TWITTER_API_PARAMS from "./Configuration/TwitterApiParams.js"
import TWITTER_API_SEARCH_PARAMS from "./Configuration/TwitterApiSearchParams.js"
import ApiAbstract from "./_ApiAbstract.js"

const MIN_RESULTS = 10

class Search extends ApiAbstract {
	#endpoint
	#page_size
	#query_params

	fetch( query, next_token, max_results ) {
		if ( max_results ) {
			max_results = Math.max( max_results, MIN_RESULTS )
			max_results = Math.min( max_results, this.#page_size )
		} else {
			max_results = this.#page_size
		}
		const dynamicRequestParams = {
			query,
			max_results,
			next_token,
		}
		return this.httpGet( this.#endpoint, { params: Object.assign(
			dynamicRequestParams,
			this.#query_params,
		)})
	}

	constructor( req, res, api_params, endpoint_params, headers ) {
		super( req, res, api_params.base_url, headers )
		this.#endpoint = endpoint_params.endpoint
		this.#page_size = api_params.page_size
		this.#query_params = endpoint_params.query_params
	}
}

export default {

	path: "/api/twitter/search",

	async handler( req, res ) {
		const search = new Search( req, res, TWITTER_API_PARAMS, TWITTER_API_SEARCH_PARAMS, {
			"Authorization": "Bearer " + TWITTER_API_PARAMS.bearer_token,
		})
		const query = search.getUrlApiParam( "query" )
		const next_token = search.getUrlApiParam( "next_token" )
		const max_results = search.getUrlApiParam( "max_results" )
		const data = await search.fetch( query, next_token, max_results )
		search.respondJson( data )
	}
}
