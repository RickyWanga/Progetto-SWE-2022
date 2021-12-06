class PublicMetrics {
	#retweet_count = ""
	#reply_count = ""
	#like_count= ""
	#quote_count= ""

	constructor( tweet ) {
		if ( tweet.public_metrics ) {
			this.#retweet_count = tweet.public_metrics.retweet_count
			this.#reply_count = tweet.public_metrics.reply_count
			this.#like_count = tweet.public_metrics.like_count
			this.#quote_count = tweet.public_metrics.quote_count
		}
	}

	get retweet_count() {
		return this.#retweet_count
	}

	get reply_count() {
		return this.#reply_count
	}

	get like_count() {
		return this.#like_count
	}

	get quote_count() {
		return this.#quote_count
	}
}

export default PublicMetrics
