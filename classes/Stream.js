class Stream {
	#http = {}
	#http_headers = {}
	#old_seek = 0
	#onErrorCallback = null
	#onProgressCallback = null
	#query = ""
	#route = ""
	#status = ""
	#STATUS = {
		ERROR: "error",
		START: "start",
		STARTING: "starting",
		STOP: "stop",
		STOPPING: "stopping",
	}

	#onError( message ) {
		this.#status = this.#STATUS.ERROR
		this.#onErrorCallback && this.#onErrorCallback( message )
	}

	#onProgress( progress ) {
		const seek = progress.target.response.length
		try {
			const tweets_json = progress.target.response.slice( this.#old_seek, seek ).trim()
			const tweets_obj = JSON.parse( tweets_json )
			if ( tweets_obj.data ) {
				tweets_obj.data = [ tweets_obj.data ]
				this.#onProgressCallback && this.#onProgressCallback( tweets_obj )
			}
		} catch ( error ) {
			// Keep alive signal received
		}
		this.#old_seek = seek
	}

	setQuery( query ) {
		this.#query = query
		const params = { rules: { "add": [{ "value": query }]} }
		return this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			params,
			withCredentials: true,
		})
	}

	start( query ) {
		this.#status = this.#STATUS.STARTING
		const params = { start: true }
		if ( query ) {
			this.#query = query
			params.rules = { "add": [{ "value": query }]}
		}
		return this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			onDownloadProgress: this.#onProgress.bind( this ),
			params,
			withCredentials: true,
		}).then(( response ) => {
			if ( !response.data.error ) {
				this.#status = this.#STATUS.START
			} else {
				this.#onError( "STREAM DATA ERROR: " + response.data.error.message )
			}
		}).catch(( error ) => {
			this.#onError( "STREAM ERROR: " + error.message )
		})
	}

	stop() {
		this.#status = this.#STATUS.STOPPING
		const params = { stop: true }
		return this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			params,
			withCredentials: true,
		}).then(() => {
			this.#status = this.#STATUS.STOP
		}).catch(( error ) => {
			this.#onError( "STREAM ERROR: " + error.message )
		})
	}

	constructor({ http_route, http_config, onProgress, onError }) {
		const bearer_token = Buffer.from( `${ Date.now() }${ Math.random() }` ).toString( "base64" ).replace( /=/g, "L" ) // Client token
		this.#http = http_config // Http handler injection
		this.#http_headers = { "Authorization": `Bearer ${ bearer_token }` }
		this.#onErrorCallback = onError
		this.#onProgressCallback = onProgress
		this.#route = http_route
	}

	get query() {
		return this.#query
	}

	get status() {
		return this.#status
	}

	get STATUS() {
		return this.#STATUS
	}
}

export default Stream
