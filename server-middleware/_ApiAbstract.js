import axios from "axios"

class ApiAbstract {
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
		let message = error.message
		const status = error.status || error.response?.status

		try {
			message = error.response.data.errors[ 0 ].message
			message = message || error.response.data.reason
		} catch ( e ) {
			// Failed retrieving specific error messages from various sources
		}

		return { error: {
			message,
			status,
		}}
	}

	getUrlApiParams( req ) {
		const url_req = ( req || this.#req ).url.replace( /^\/\?/, "" ) // Strips the first two chars from url: "/?"
		return new URLSearchParams( url_req )
	}

	getUrlApiParam( param, req ) {
		const url_params = this.getUrlApiParams( req )
		return url_params.get( param )
	}

	http( params ) {
		let data = {}
		return new Promise(( resolve ) => {
			this.#axios( params ).then(( response ) => {
				data = this.#getData( response )
			}).catch(( error ) => {
				data = this.#getDataError( error )
			}).finally(() => {
				resolve( data )
			})
		})
	}

	httpGet( url, params ) {
		return this.http( Object.assign({ url, method: "get" }, params ))
	}

	httpPost( url, params ) {
		return this.http( Object.assign({ url, method: "post" }, params ))
	}

	respondJson( data ) {
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

	get _getData() {
		return this.#getData
	}

	get _getDataError() {
		return this.#getDataError
	}

	get req() {
		return this.#req
	}

	get res() {
		return this.#res
	}

	set req( req ) {
		this.#req = req
	}

	set res( res ) {
		this.#res = res
	}
}

export default ApiAbstract
