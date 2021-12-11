import GeoModel from "./GeoModel"
import UserModel from "./UserModel"
import PublicMetrics from "./PublicMetrics"
import MediaModel from "./MediaModel"

class TweetModel {
	#id = 0
	#date = ""
	#geo = {}
	#media = {}
	#public_metrics = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []

	constructor( tweet ) {
		const hashtags = ( tweet.entities && tweet.entities.hashtags ) || []
		const text = tweet.text || ""
		this.#date = tweet.created_at
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#media = new MediaModel( tweet )
		this.#public_metrics = new PublicMetrics( tweet )
		this.#tags = hashtags.map(( hashtag ) => hashtag.tag )
		this.#text = text
		this.#user = new UserModel( tweet )
		this.#words = text.split( " " )
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

	get media() {
		return this.#media
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
