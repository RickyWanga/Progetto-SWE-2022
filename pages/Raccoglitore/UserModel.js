class UserModel {
	#account = ""
	#name = ""
	#picture = ""

	constructor( status ) {
		if ( status && status.user ) {
			this.#account = status.user.screen_name
			this.#name = status.user.name
			this.#picture = status.user.profile_image_url_https
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
