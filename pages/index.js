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
			show_grafici: true,
			tweets: [],
		}
	},
	computed: {
		days(){
			const ret = [0,0,0,0,0,0,0]
			this.tweets.forEach( tweet => {
				const day = tweet.data.toLowerCase().substr(0,3)
				if (day === "mon") {
					ret[0]++
				}else if (day === "tue") {
					ret[1]++
				}else if (day === "wed") {
					ret[2]++
				}else if (day === "thu") {
					ret[3]++
				}else if (day === "fri") {
					ret[4]++
				}else if (day === "sat") {
					ret[5]++
				}else if (day === "sun") {
					ret[6]++
				}
			})
			return ret
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
	created() {
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
		const on = ( event, model ) => {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		}
		on( "toggle-map", "show_map" )
		on( "toggle-media", "show_media" )
		on( "toggle-tagcloud", "show_tagcloud" )
		on( "toggle-grafici", "show_grafici" )
	},
}
