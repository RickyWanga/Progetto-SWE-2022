import GeoModel from "./GeoModel"
import UserModel from "./UserModel"

class TweetModel {
	#data = ""
	#id = 0
	#date = ""
	#geo = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []

	constructor( status ) {
		this.#data = status.created_at
		this.#id = status.id
		this.#geo = new GeoModel( status )
		this.#tags = status.entities.hashtags.map(( hashtag ) => hashtag.text )
		this.#text = status.text
		this.#user = new UserModel( status )
		this.#words = status.text.split( " " )
		this.#date = status.created_at
	}

	get date() {
		return this.#date
	}

	get data() {
		return this.#data
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
