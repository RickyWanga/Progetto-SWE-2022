import GeoModel from "./GeoModel"
import UserModel from "./UserModel"

class TweetModel {
	#id = 0
	#geo = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []

	constructor( tweet ) {
		const hashtags = ( tweet.entities && tweet.entities.hashtags ) || []
		const text = tweet.text || ""
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#tags = hashtags.map(( hashtag ) => hashtag.tag )
		this.#text = text
		this.#user = new UserModel( tweet )
		this.#words = text.split( " " )
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
}

export default TweetModel
