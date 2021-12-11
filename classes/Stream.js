class Stream {
	#http = {}
	#http_headers = {}
	#old_seek = 0
	#onErrorCallback = () => {}
	#onProgressCallback = () => {}
	#route = ""

	#onError( message ) {
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
		return this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			params: {
				rules: { "add": [{ "value": query }]},
			},
			withCredentials: true,
		})
	}

	start( query ) {
		const rules = query && { "add": [{ "value": query }]}
		this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			onDownloadProgress: this.#onProgress.bind( this ),
			params: {
				rules,
				start: true,
			},
			responseType: "stream",
			withCredentials: true,
		}).then(( response ) => {
			if ( response.data.error ) {
				this.#onError( "STREAM DATA ERROR: " + response.data.error.message )
			}
		}).catch(( error ) => {
			this.#onError( "STREAM ERROR: " + error.message )
		})
	}

	stop() {
		return this.#http.module.get( this.#route, {
			headers: this.#http_headers,
			params: { stop: true },
			withCredentials: true,
		})
	}

	constructor( http_route, http_config, onProgress, onError ) {
		this.#http = http_config // Http handler injection
		this.#http_headers = { "Authorization": `Bearer ${ btoa( Date.now() + Math.random() )}` }
		this.#onErrorCallback = onError
		this.#onProgressCallback = onProgress
		this.#route = http_route
	}
}

export default Stream
