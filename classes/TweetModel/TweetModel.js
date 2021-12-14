import GeoModel from "./GeoModel"
import UserModel from "./UserModel"
import PublicMetrics from "./PublicMetrics"
import ReferenceModel from "./ReferenceModel"

class TweetModel {
	#conversation_id = 0
	#id = 0
	#date = ""
	#geo = {}
	#public_metrics = {}
	#reference = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []

	constructor( tweet ) {
		const hashtags = ( tweet.entities && tweet.entities.hashtags ) || []
		const text = tweet.text || ""
		this.#conversation_id = tweet.conversation_id
		this.#date = tweet.created_at
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#public_metrics = new PublicMetrics( tweet )
		this.#reference = new ReferenceModel( tweet )
		this.#tags = hashtags.map(( hashtag ) => hashtag.tag )
		this.#text = text
		this.#user = new UserModel( tweet )
		this.#words = text.split( " " )
	}

	get conversation_id() {
		return this.#conversation_id
	}

	get date() {
		return this.#date
	}

	get id() {
		return this.#id
	}

	get geo() {
		return this.#geo
	}

	get public_metrics() {
		return this.#public_metrics
	}

	get reference() {
		return this.#reference
	}

	get tags() {
		return this.#tags
	}

	get text() {
		return this.#text
	}

	get user() {
		return this.#user
	}

	get words() {
		return this.#words
	}
}

export default TweetModel
