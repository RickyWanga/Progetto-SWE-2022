import Raccoglitore from "./Raccoglitore/Raccoglitore.js"

const SEARCH_ROUTE = "twitter/search"
const LABEL_INFO_EMPTY = "Sorry, there are no results for this search"
const LABEL_ERROR_UNKNOWN = "Unknown error"

export default {
	name: "Dashboard",
	data() {
		return {
			alert: {
				message: "",
				type: "",
				show: false,
			},
			loading_tweets: false,
			show_map: true,
			show_media: true,
			show_tagcloud: true,
			tweets: [],
		}
	},
	computed: {
		geo() {
			return this.tweets
				.filter(( tweet ) => tweet.geo.target )
				.map(( tweet ) => tweet.geo )
		},
		media() {
			return this.tweets && this.tweets.media
		},
		tags() {
			const tags = {}
			this.tweets.forEach(( tweet ) => tweet.tags.forEach( tag => {
				const tag_slug = tag.toLowerCase()
				tags[ tag_slug ] = tags[ tag_slug ] ? tags[ tag_slug ] + 1 : 1
			}))
			return Object.entries( tags )
		},
	},
	mounted() {
		this.$nuxt.$on( "query", async ({ query }) => {
			if ( !query ) { return } // Guard
			const async_data = await this.getTweets( query )
			if ( !async_data.error ) {
				const raccoglitore = new Raccoglitore( async_data )
				this.tweets = raccoglitore.tweets
				if ( !this.tweets.length ) {
					this.showAlertInfo( LABEL_INFO_EMPTY )
				}
			} else {
				this.showAlertError( async_data.error.message || LABEL_ERROR_UNKNOWN )
			}
		})

		this.onToggle( "toggle-map", "show_map" )
		this.onToggle( "toggle-media", "show_media" )
		this.onToggle( "toggle-tagcloud", "show_tagcloud" )
	},
	methods: {
		getTweets( query ) {
			this.loading_tweets = true
			return this.$axios.$get( SEARCH_ROUTE, { params: {
				query
			}}).finally(() => {
				this.loading_tweets = false
			})
		},
		onToggle( event, model ) {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		},
		showAlert( message, type, show = true ) {
			this.alert = { message, show, type }
		},
		showAlertError( message ) {
			this.showAlert( message, "error" )
		},
		showAlertInfo( message ) {
			this.showAlert( message, "info" )
		},
	},
}
