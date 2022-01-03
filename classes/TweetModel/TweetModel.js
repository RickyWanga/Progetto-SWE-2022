import GeoModel from "./GeoModel"
import MediaModel from "./MediaModel"
import PublicMetricsModel from "./PublicMetricsModel"
import ReferenceModel from "./ReferenceModel"
import UserModel from "./UserModel"

class TweetModel {
	#conversation_id = 0
	#id = 0
	#date = ""
	#geo = {}
	#media = {}
	#mentions = []
	#public_metrics = {}
	#reference = {}
	#tags = []
	#text = ""
	#user = {}

	constructor( tweet ) {
		const hashtags = ( tweet.entities && tweet.entities.hashtags ) || []
		const mentions = ( tweet.entities && tweet.entities.mentions ) || []
		const text = tweet.text || ""
		this.#conversation_id = tweet.conversation_id
		this.#date = tweet.created_at
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#media = new MediaModel( tweet )
		this.#mentions = mentions.map(( mention ) => mention.username )
		this.#public_metrics = new PublicMetricsModel( tweet )
		this.#reference = new ReferenceModel( tweet )
		this.#tags = hashtags.map(( hashtag ) => hashtag.tag )
		this.#text = text
		this.#user = new UserModel( tweet )
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

	get media() {
		return this.#media
	}

	get mentions() {
		return this.#mentions
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
}

export default TweetModel
