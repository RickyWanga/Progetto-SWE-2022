import GeoModel from "./GeoModel"
import UserModel from "./UserModel"
import PublicMetrics from "./PublicMetrics"

class TweetModel {
	#id = 0
	#date = ""
	#geo = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []
	#public_metrics = {}

	constructor( tweet ) {
		const hashtags = ( tweet.entities && tweet.entities.hashtags ) || []
		const text = tweet.text || ""
		this.#date = tweet.created_at
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#tags = hashtags.map(( hashtag ) => hashtag.tag )
		this.#text = text
		this.#user = new UserModel( tweet )
		this.#words = text.split( " " )
		this.#public_metrics = new PublicMetrics( tweet )
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

	get public_metrics() {
		return this.#public_metrics
	}
}

export default TweetModel
