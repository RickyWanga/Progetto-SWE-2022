class MediaModel {
	#url = null
	#height = 0
	#width = 0
	#type = ""

	constructor( tweet ) {
		if ( tweet.media_expansion ) {
			this.#url = tweet.media_expansion.url
			this.#height = tweet.media_expansion.height
			this.#width = tweet.media_expansion.width
			this.#type = tweet.media_expansion.type
		}
	}

	get url() {
		return this.#url
	}

	get height() {
		return this.#height
	}

	get width() {
		return this.#width
	}

	get type() {
		return this.#type
	}
}

export default MediaModel
