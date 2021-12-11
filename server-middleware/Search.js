import TWITTER_API_PARAMS from "./Configuration/TwitterApiParams.js"
import TWITTER_API_SEARCH_PARAMS from "./Configuration/TwitterApiSearchParams.js"
import ApiAbstract from "./_ApiAbstract.js"

class Search extends ApiAbstract {
	#endpoint
	#max_results
	#query_params

	fetch( query ) {
		const dynamicRequestParams = {
			query,
			max_results: this.#max_results,
		}
		return this.httpGet( this.#endpoint, { params: Object.assign(
			dynamicRequestParams,
			this.#query_params,
		)})
	}

	constructor( req, res, api_params, endpoint_params, headers ) {
		super( req, res, api_params.base_url, headers )
		this.#endpoint = endpoint_params.endpoint
		this.#max_results = api_params.page_size
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
		const data = await search.fetch( query )
		search.respondJson( data )
	}
}
