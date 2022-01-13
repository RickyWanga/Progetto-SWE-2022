import ConcorsoModel from "./ConcorsoModel"
import GeoModel from "./GeoModel"
import MediaModel from "./MediaModel"
import PublicMetricsModel from "./PublicMetricsModel"
import ReferenceModel from "./ReferenceModel"
import UserModel from "./UserModel"

class TweetModel {
	#concorso = {}
	#conversation_id = 0
	#id = 0
	#date = ""
	#geo = {}
	#media = {}
	#public_metrics = {}
	#reference = {}
	#tags = []
	#text = ""
	#user = {}
	#words = []

	constructor( tweet ) {
		const hashtags = ( tweet.entities?.hashtags || [] ).map(( hashtag ) => hashtag.tag )
		const text = tweet.text || ""
		this.#concorso = new ConcorsoModel( hashtags )
		this.#conversation_id = tweet.conversation_id
		this.#date = tweet.created_at
		this.#id = tweet.id
		this.#geo = new GeoModel( tweet )
		this.#media = new MediaModel( tweet )
		this.#public_metrics = new PublicMetricsModel( tweet )
		this.#reference = new ReferenceModel( tweet )
		this.#tags = hashtags
		this.#text = text
		this.#user = new UserModel( tweet )
		this.#words = text.split( " " )
	}

	get concorso() {
		return this.#concorso
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
