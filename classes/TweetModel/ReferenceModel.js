class ReferenceModel {
	#id = 0

	constructor( tweet ) {
		const ref = tweet.referenced_tweets && tweet.referenced_tweets.find((refernce) => refernce.type === "replied_to")
		if ( ref ) {
			this.#id = ref.id
		}
	}

	get id() {
		return this.#id
	}
}

export default ReferenceModel
