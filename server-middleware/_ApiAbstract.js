import axios from "axios"

class Api {
	#axios
	#req
	#res

	#getData( response = {} ) {
		const data = response.data || {}
		if ( 200 !== response.status ) {
			data.error = {
				status: response.status,
				message: response.statusText,
			}
		}
		return data
	}

	#getDataError( error = {} ) {
		const data = {
			message: error.message,
		}
		try {
			data.message = error.response.data.errors[ 0 ].message
			data.message = data.message || error.response.data.reason
		} catch ( e ) {
		} finally {
			data.status = error.response && error.response.status
		}
		return data
	}

	#getUrlApiParams() {
		const url_req = this.#req.url.substring( 2 ) // Strips the first two chars from url: "/?"
		return new URLSearchParams( url_req )
	}

	#getUrlApiParam( param ) {
		const url_params = this.getUrlApiParams()
		return url_params.get( param )
	}

	#respondWithJson( data ) {
		const data_json = JSON.stringify( data )
		this.#res.writeHead( 200, { "Content-Type": "application/json" })
		this.#res.end( data_json )
	}

	constructor( req, res, baseURL, headers ) {
		const axios_params = {}
		this.#req = req
		this.#res = res
		if ( baseURL ) {
			axios_params.baseURL = baseURL
		}
		if ( headers ) {
			axios_params.headers = headers
		}
		this.#axios = axios.create( axios_params )
	}

	fetch() {}

	get _getData() {
		return this.#getData
	}

	get _getDataError() {
		return this.#getDataError
	}

	get getUrlApiParam() {
		return this.#getUrlApiParam
	}

	get getUrlApiParams() {
		return this.#getUrlApiParams
	}

	get httpGet() {
		return this.#axios.get
	}

	get respondWithJson() {
		return this.#respondWithJson
	}
}

export default Api
