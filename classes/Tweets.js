import TweetModel from "./TweetModel/TweetModel"

class Tweets {
	#list = []

	#tweetModel( tweet ) {
		return new TweetModel( tweet )
	}

	// tweets[].media_expansion.media_key[] <- includes.media_key[]
	#tweetsHydratesMedia ( tweets, media_expansion ) {
		tweets.forEach(( tweet ) => {
			if ( tweet.attachments?.media_keys ) {
				tweet.media_expansion = media_expansion.filter(( media ) =>
					tweet.attachments?.media_keys?.includes( media.media_key ))
			}
		})
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
			if ( tweet.geo?.place_id ) {
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
		if ( includes.media ) {
			this.#tweetsHydratesMedia( tweets, includes.media )
		}
	}

	constructor( response ) {
		const tweets = response.data || []
		if ( response.includes ) {
			this.#tweetsHydrates( tweets, response.includes )
		}
		this.#list = tweets.map( this.#tweetModel )
	}

	get list() {
		return this.#list
	}
}

export default Tweets
