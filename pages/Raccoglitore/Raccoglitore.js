import TweetModel from "./TweetModel"

class Raccoglitore {
	#tweets = []

	#tweetModel( status ) {
		return new TweetModel( status )
	}

	#tweetsMap( statuses ) {
		return statuses.map( this.#tweetModel )
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
