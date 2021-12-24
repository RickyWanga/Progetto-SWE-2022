class Sentiments {
	#buffer = []
	#buffer_consume_interval = 0
	#buffer_consume_pagesize = 0
	#buffer_consume_time = 0
	#http = {}
	#onBufferEmpty = null
	#onSetSentiment = null
	#route = ""

	#bufferConsume() {
		if ( this.#buffer.length ) {
			const tweets = this.#buffer.slice( 0, this.#buffer_consume_pagesize )
			this.#buffer = this.#buffer.slice( this.#buffer_consume_pagesize )
			tweets.forEach(( tweet ) => {
				if ( !tweet.sentiment ) {
					this.#getSentimentAsync( tweet ).then(( sentiment ) => {
						this.#setSentiment( tweet, sentiment )
					})
				}
			})
		} else {
			this.bufferEmpty()
			this.#onBufferEmpty && this.#onBufferEmpty()
		}
	}

	#bufferConsumeIntervalStart() {
		this.#bufferConsumeIntervalStop()
		this.#buffer_consume_interval = setInterval( this.#bufferConsume.bind( this ), this.#buffer_consume_time )
	}

	#bufferConsumeIntervalStop() {
		clearInterval( this.#buffer_consume_interval )
		this.#buffer_consume_interval = 0
	}

	#getSentimentAsync( tweet ) {
		return new Promise(( resolve ) => {
			this.#http.$get( this.#route, { params: {
				text: tweet.text,
			}}).then(( sentiment = {}) => {
				if ( sentiment.score ) {
					sentiment.value = sentiment.score
					sentiment.score = Math.round(Math.abs( sentiment.score ) * 100 ).toString()
				} else {
					sentiment = { score: "0", value: 0 }
				}
				resolve( sentiment )
			})
		})
	}

	#setSentiment( tweet, sentiment ) {
		this.#onSetSentiment && this.#onSetSentiment( tweet, sentiment )
	}

	/**
	 *
	 * @param {Array<TweetModel>} tweets
	 */
	bufferAdd( tweets, has_priority ) {
		this.#buffer = has_priority ? tweets.concat( this.#buffer ) : this.#buffer.concat( tweets )
		if ( !this.#buffer_consume_interval ) {
			this.#bufferConsumeIntervalStart()
		}
	}

	/**
	 *
	 */
	bufferEmpty() {
		this.#bufferConsumeIntervalStop()
		this.#buffer = []
	}

	/**
	 *
	 */
	constructor( params ) {
		this.#buffer_consume_pagesize = params.buffer_page_size
		this.#buffer_consume_time = params.buffer_interval_duration
		this.#http = params.http_config.module // Http handler injection
		this.#onSetSentiment = params.onSetSentiment
		this.#onBufferEmpty = params.onBufferEmpty
		this.#route = params.http_route
	}
}

export default Sentiments
