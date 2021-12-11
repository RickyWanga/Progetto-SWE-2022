import TWITTER_API_PARAMS from "./Configuration/TwitterApiParams.js"
import TWITTER_API_STREAM_PARAMS from "./Configuration/TwitterApiStreamParams.js"
import ApiAbstract from "./_ApiAbstract.js"

class Stream extends ApiAbstract {
	#endpoint
	#query_params
	#rules_endpoint
	#stream

	#rulesAdd( rules ) {
		return this.httpPost( this.#rules_endpoint, { data: rules })
	}

	#rulesDelete( rules = [] ) {
		const ids = rules.map( rule => rule.id )
		return this.httpPost( this.#rules_endpoint, { data: { delete: { ids }}})
	}

	#rulesGet() {
		return this.httpGet( this.#rules_endpoint )
	}

	#streamData( data ) {
		try {
			this.res.write( data )
		} catch ( error ) {
			console.log( error )
		}
	}

	#streamError( error ) {
		console.log( error )
	}

	async setNewRules( new_rules ) {
		const old_rules = await this.#rulesGet()
		await this.#rulesDelete( old_rules.data ) // Delete old rules
		await this.#rulesAdd( new_rules ) // Add new rules
	}

	async start() {
		this.#stream = await this.httpGet( this.#endpoint, { // Get stream
			params: Object.assign( this.#query_params ),
			responseType: "stream",
			// timeout: 30000,
		})
		if ( !this.#stream.error ) {
			this.#stream.on( "data", this.#streamData.bind( this ))
			this.#stream.on( "error", this.#streamError.bind( this ))
		} else {
			console.log( this.#stream.error )
		}
	}

	stop() {
		this.#stream?.req?.destroy()
		this.res.end()
	}

	constructor( req, res, api_params, endpoint_params, headers ) {
		super( req, res, api_params.base_url, headers )
		this.#endpoint = endpoint_params.endpoint
		this.#rules_endpoint = endpoint_params.rules.endpoint
		this.#query_params = endpoint_params.query_params
	}
}

const clients = {}

export default {

	path: "/api/twitter/stream",

	handler( req, res ) {
		const client_id = req.headers.authorization
		let stream = clients[ client_id ]
		if ( !stream ) {
			stream = new Stream( req, res, TWITTER_API_PARAMS, TWITTER_API_STREAM_PARAMS, {
				"Authorization": "Bearer " + TWITTER_API_PARAMS.bearer_token,
				"Connection": "keep-alive",
				"Content-Type": "application/json",
			})
			clients[ client_id ] = stream
		}
		const start = stream.getUrlApiParam( "start", req )
		const stop = stream.getUrlApiParam( "stop", req )
		const rules = stream.getUrlApiParam( "rules", req )
		if ( rules ) {
			stream.setNewRules( rules )
			start || res.end()
		}
		if ( start ) {
			stream.req = req
			stream.res = res
			stream.start()
		} else if ( stop ) {
			stream.stop()
			res.end()
		}
	}
}
