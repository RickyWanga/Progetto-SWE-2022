import TWITTER_API_PARAMS from "./Configuration/TwitterApiParams.js"
import TWITTER_API_SEARCH_PARAMS from "./Configuration/TwitterApiSearchParams.js"
import ApiAbstract from "./_ApiAbstract.js"

class Search extends ApiAbstract {
	#endpoint
	#max_results
	#query_params

	#getStaticRequestParams() {
		return Object.entries( this.#query_params ).reduce(( params, [ param, value ]) =>
			( value && ( params[ param ] = value ) && params ) || params, { })
	}

	fetch( query ) {
		let data = {}
		const dynamicRequestParams = {
			query,
			max_results: this.#max_results,
		}
		return new Promise(( resolve ) => {
			this.httpGet( this.#endpoint, { params: Object.assign(
				dynamicRequestParams,
				this.#getStaticRequestParams(),
			)}).then(( response ) => {
				data = this._getData( response )
			}).catch(( error ) => {
				data = this._getDataError( error )
			}).finally(() => {
				resolve( data )
			})
		})
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
			// "Accept-Encoding": "gzip",
		})
		const query = search.getUrlApiParam( "query" )
		const data = await search.fetch( query )
		search.respondWithJson( data )
	}
}
