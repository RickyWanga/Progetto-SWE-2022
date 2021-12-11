import DateGroups from "~/classes/DateGroups"
import Raccoglitore from "~/classes/Raccoglitore"
import Sentiments from "~/classes/Sentiments"
import Stream from "~/classes/Stream"

const CLIENT_CONFIGURATION_ROUTE = "/api/client-configuration"
const SEARCH_ROUTE = "/api/twitter/search"
const SENTIMENT_ROUTE = "/api/sentiment"
const STREAM_ROUTE = "/api/twitter/stream"

const LABEL_INFO_EMPTY = "Sorry, there are no results for this search"
const LABEL_ERROR_UNKNOWN = "Unknown error"

export default {
	data() {
		return {
			alert: {
				message: "",
				type: "",
				show: false,
			},
			http_config: {
				module: this.$axios,
			},
			sentiments: {
				loading: true,
				module: null,
				neg: 0,
				pos: 0,
			},
			show_map: true,
			show_media: true,
			show_tagcloud: true,
			stream: {
				active: false,
				module: null,
				query: "",
			},
			tweets: [],
			tweets_loading: false,
			tweet_modal_show: false,
			tweet_modal_tweet: null,
		}
	},
	async asyncData({ $axios }) {
		const client_configuration = await $axios.$get( CLIENT_CONFIGURATION_ROUTE )
		return { client_configuration }
	},
	computed: {
		dates() {
			const dates = {}
			const tweets_dates = this.tweets.map(( tweet ) => new Date( tweet.date ))
			if ( tweets_dates.length > 1 ) {
				new DateGroups( tweets_dates ).makeLabelsValues( dates )
			}
			return {
				labels: Object.keys( dates ),
				values: Object.values( dates ),
			}
		},
		hasDateDiagram() {
			return this.dates.values.length > 1
		},
		geo() {
			return this.tweets
				.filter(( tweet ) => !!tweet.geo?.target )
				.map(( tweet ) => tweet.geo )
		},
		media() {
			return this.tweets && this.tweets.media
		},
		sentiment() {
			return {
				positive: Math.round(( this.sentiments.pos * 100 ) / ( this.tweets.length || 1 )),
				negative: Math.round(( this.sentiments.neg * 100 ) / ( this.tweets.length || 1 )),
			}
		},
		tags() {
			const tags = {}
			this.tweets.forEach(( tweet ) => tweet.tags?.forEach( tag => {
				const tag_slug = tag.toLowerCase()
				tags[ tag_slug ] = tags[ tag_slug ] ? tags[ tag_slug ] + 1 : 1
			}))
			return Object.entries( tags )
		},
	},
	mounted() {
		this.$nuxt.$on( "query", this.onQuery )
		this.$nuxt.$on( "toggle-stream", this.onToggleStream )
		this.$nuxt.$on( "tweet-click", this.onTweetClick )
		this.onToggle( "toggle-map", "show_map" )
		this.onToggle( "toggle-media", "show_media" )
		this.onToggle( "toggle-tagcloud", "show_tagcloud" )

		this.sentiments.module = new Sentiments({
			http_route: SENTIMENT_ROUTE,
			http_config: this.http_config,
			buffer_page_size: this.client_configuration.SENTIMENT_PAGE_SIZE * 1,
			buffer_interval_duration: this.client_configuration.SENTIMENT_PAGE_INTERVAL * 1,
			onSetSentiment: this.onSentimentSet,
			onBufferEmpty: this.onSentimentsBufferEmpty,
		})

		this.stream.module = new Stream( STREAM_ROUTE, this.http_config, ( async_data ) => {
			const tweets = new Raccoglitore( async_data )
			this.tweets = tweets.list.concat( this.tweets )
		}, this.showAlertError )
	},
	methods: {
		getSentiments( tweets ) {
			this.sentiments.module.bufferAdd( tweets )
		},
		getTweets( query ) {
			this.tweets_loading = true
			this.init()
			return this.$axios.$get( SEARCH_ROUTE, { params: {
				query
			}}).finally(() => {
				this.tweets_loading = false
			})
		},
		init() {
			this.tweets = []
			this.sentiments.pos = 0
			this.sentiments.neg = 0
			this.sentiments.loading = true
		},
		async onQuery({ query }) {
			if ( !query ) { return } // Guard
			const async_data = await this.getTweets( query )
			if ( !async_data.error ) {
				const raccoglitore = new Raccoglitore( async_data )
				this.tweets = raccoglitore.tweets
				if ( raccoglitore.tweets.length ) {
					this.getSentiments( raccoglitore.tweets )
					this.setStreamQuery( query )
				} else {
					this.showAlertInfo( LABEL_INFO_EMPTY )
				}
			} else {
				this.showAlertError( async_data.error.message || LABEL_ERROR_UNKNOWN )
			}
		},
		onSentimentsBufferEmpty() {
			this.tweets = [ ...this.tweets ] // Flush data
			this.sentiments.loading = false
		},
		onSentimentSet( _, sentiment ) {
			if ( sentiment.value > 0 ) {
				this.sentiments.pos += 1
			} else if ( sentiment.value < 0 ) {
				this.sentiments.neg += 1
			}
		},
		onToggle( event, model ) {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		},
		onToggleStream( start ) {
			if ( start ) {
				this.stream.module?.start( this.stream.query )
				this.stream.query = null
			} else {
				this.stream.module?.stop()
			}
			this.stream.active = start
		},
		onTweetClick( tweet ) {
			this.tweet_modal_show = true
			this.tweet_modal_tweet = tweet
		},
		setStreamQuery( query ) {
			if ( this.stream.active ) {
				this.stream.module?.setQuery( query )
				this.stream.query = null
			} else {
				this.stream.query = query
			}
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
