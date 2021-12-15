const TYPE_IMAGE = [ "photo" ]

class MediaModel {
	#all = []
	#images = []

	constructor( tweet ) {
		if ( tweet.media_expansion ) {
			this.#all = tweet.media_expansion.map(( media ) => {
				return {
					alt: media.alt_text,
					height: media.height,
					key: media.media_key,
					target: tweet.id,
					type: media.type,
					url: media.url,
					width: media.width,
				}
			})
			this.#images = this.#all.filter(( media ) => TYPE_IMAGE.includes( media.type ))
		}
	}

	get all() {
		return this.#all
	}

	get images() {
		return this.#images
	}
}

export default MediaModel
