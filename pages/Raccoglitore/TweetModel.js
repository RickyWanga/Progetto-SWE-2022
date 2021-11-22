class TweetModel {
	#id = 0
	#geo = {}
	#text = ""
	#user = {}
	#words = []

	constructor( status, geoModel, userModel ) {
		this.#id = status.id
		this.#geo = geoModel
		this.#text = status.text
		this.#user = userModel
		this.#words = status.text.split( " " )
	}

	get id() {
		return this.#id
	}

	get geo() {
		return this.#geo
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