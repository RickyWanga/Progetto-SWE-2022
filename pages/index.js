import Raccoglitore from "./Raccoglitore/Raccoglitore.js"

const API_SEARCH_ENDPOINT = "twitter/search"

export default {
	name: "Page1",
	data() {
		return {
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
	created() {
		this.$nuxt.$on( "query", ({ query }) => {
			this.loading_tweets = true
			this.$axios.$get( API_SEARCH_ENDPOINT, { params: {
				query: encodeURIComponent( query )
			}}).then(( async_data ) => {
				const raccoglitore = new Raccoglitore( async_data )
				this.tweets = raccoglitore.tweets
			}).finally(() => {
				this.loading_tweets = false
			})
		})

		// Toggle layout elements
		// Mapping event to model
		for ( const [ event, model ] of Object.entries({
			"toggle-map": "show_map",
			"toggle-media": "show_media",
			"toggle-tagcloud": "show_tagcloud",
		})) {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		}
	},
}
