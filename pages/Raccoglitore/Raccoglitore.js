import TweetModel from "./TweetModel"
import GeoModel from "./GeoModel"
import UserModel from "./UserModel"

class Raccoglitore {
	#tweets = []

	#tweetModel( status ) {
		const geoModel = new GeoModel( status )
		const userModel = new UserModel( status )
		return new TweetModel( status, geoModel, userModel )
	}

	#tweetsMap( statuses ) {
		return statuses.map( this.#tweetModel.bind( this ) )
	}

	constructor( data ) {
		if ( data ) {
			this.#tweets = this.#tweetsMap( data.statuses )
		}
	}

	get tweets() {
		return this.#tweets
	}
}

export default Raccoglitore
