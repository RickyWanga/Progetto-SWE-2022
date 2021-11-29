class UserModel {
	#account = ""
	#name = ""
	#picture = ""

	constructor( tweet ) {
		if ( tweet.author_expansion ) {
			this.#account = tweet.author_expansion.username
			this.#name = tweet.author_expansion.name
			this.#picture = tweet.author_expansion.profile_image_url
		}
	}

	get account() {
		return this.#account
	}

	get name() {
		return this.#name
	}

	get picture() {
		return this.#picture
	}
}

export default UserModel
