import TweetModel from "./TweetModel/TweetModel"

class Raccoglitore {
	#tweets = []

	#tweetModel( tweet ) {
		return new TweetModel( tweet )
	}

	// tweets[].author_expansion <- includes.users[]
	#tweetsHydratesUsers( tweets, users_expansion ) {
		tweets.forEach(( tweet ) => {
			tweet.author_expansion = users_expansion.find(( user_expansion ) =>
				user_expansion.id === tweet.author_id
			)
		})
	}

	// tweets[].geo.place_expansion <- includes.places[]
	#tweetsHydratesPlaces( tweets, places_expansion ) {
		tweets.forEach(( tweet ) => {
			if ( tweet.geo && tweet.geo.place_id ) {
				tweet.geo.place_expansion = places_expansion.find(( place_expansion ) =>
					place_expansion.id === tweet.geo.place_id
				)
			}
		})
	}

	#tweetsHydrates( tweets, includes ) {
		this.#tweetsHydratesUsers( tweets, includes.users )
		if ( includes.places ) {
			this.#tweetsHydratesPlaces( tweets, includes.places )
		}
	}

	constructor( response ) {
		const tweets = response.data || []
		if ( response.includes ) {
			this.#tweetsHydrates( tweets, response.includes )
		}
		this.#tweets = tweets.map( this.#tweetModel )
	}

	get tweets() {
		return this.#tweets
	}
}

export default Raccoglitore
