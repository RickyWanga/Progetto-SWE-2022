class Raccoglitore {
	#geo = []
	#media = []
	#tweets = []

	#getCoordinates( status ) {
		return ( status.geo && status.geo.coordinates ) || ( status.place && [
			status.place.bounding_box.coordinates[ 0 ][ 0 ][ 1 ],
			status.place.bounding_box.coordinates[ 0 ][ 0 ][ 0 ]
		])
	}

	#geoModel( status ) {
		const coordinates = this.#getCoordinates( status )
		return coordinates && {
			latlng: coordinates,
			place: {
				name: status.place.full_name,
				country: status.place.country,
			},
			target: status.id,
			tooltip: status.place.full_name + " - " + status.place.country
		}
	}

	#mediaModel( status ) {
		return status && null
	}

	#tweetModel( status ) {
		return {
			id: status.id,
			geo: this.#geoModel( status ),
			media: this.#mediaModel( status ),
			text: status.text,
			user: {
				account: status.user.screen_name,
				name: status.user.name,
				picture: status.user.profile_image_url_https,
			}
		}
	}

	#tweetsMap( statuses ) {
		return statuses.map( this.#tweetModel.bind( this ) )
	}

	constructor( data ) {
		if ( data ) {
			this.#tweets = this.#tweetsMap( data.statuses )
			this.#geo = this.#tweets
				.filter(( tweet ) => tweet.geo )
				.map(( tweet ) => tweet.geo )
		}
	}

	get geo() {
		return this.#geo
	}

	get media() {
		return this.#media
	}

	get tweets() {
		return this.#tweets
	}
}

export default {
	name: "Page1",
	data() {
		return {
			geo: [],
			loading: false,
			media: [],
			show_map: true,
			show_media: true,
			show_tagcloud: true,
			tweets: [],
		}
	},
	created() {
		this.$nuxt.$on( "query", ({ query }) => {
			this.loading = true
			this.$axios.$get( "twitter/search", { params: {
				query: encodeURIComponent( query )
			}}).then(( async_data ) => {
				const raccoglitore = new Raccoglitore( async_data )
				this.tweets = raccoglitore.tweets
				this.geo = raccoglitore.geo
			}).finally(() => {
				this.loading = false
			})
		})
		this.$nuxt.$on( "toggle-map", ( toggle ) => {
			this.show_map = toggle
		})
		this.$nuxt.$on( "toggle-media", ( toggle ) => {
			this.show_media = toggle
		})
		this.$nuxt.$on( "toggle-tagcloud", ( toggle ) => {
			this.show_tagcloud = toggle
		})
	},
}
