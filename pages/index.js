import Dates from "./Dates/Dates.js"
import Raccoglitore from "./Raccoglitore/Raccoglitore.js"

const API_SEARCH_ENDPOINT = "twitter/search"
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
		dates() {
			const dates = {}
			const tweets_dates = this.tweets.map(( tweet ) => new Date( tweet.date ))
			if ( tweets_dates.length > 1 ) {
				new Dates( tweets_dates ).makeLabelsValues( dates )
			}
			return {
				labels: Object.keys( dates ),
				values: Object.values( dates ),
			}
		},
		hasDiagram() {
			return this.dates.values.length > 2
		},
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
		this.$nuxt.$on( "query", ({ query }) => {
			this.loading_tweets = true
			this.$axios.$get( API_SEARCH_ENDPOINT, { params: {
				query: encodeURIComponent( query )
			}}).then(( async_data ) => {
				if ( !async_data.error ) {
					const raccoglitore = new Raccoglitore( async_data )
					this.tweets = raccoglitore.tweets

					if ( !this.tweets.length ) {
						this.alert = {
							message: LABEL_INFO_EMPTY,
							type: "info",
							show: true,
						}
					}
				} else {
					this.alert = {
						message: async_data.error.message || LABEL_ERROR_UNKNOWN,
						type: "error",
						show: true,
					}
				}
			}).finally(() => {
				this.loading_tweets = false
			})
		})

		// Watch to toggle layout elements
		const onToggle = ( event, model ) => {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		}
		onToggle( "toggle-map", "show_map" )
		onToggle( "toggle-media", "show_media" )
		onToggle( "toggle-tagcloud", "show_tagcloud" )
	},
}
