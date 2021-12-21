import DateGroups from "~/classes/DateGroups"
import Sentiments from "~/classes/Sentiments"
import Stream from "~/classes/Stream"
import Tweets from "~/classes/Tweets"

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
			layout: {
				show_map: true,
				show_media: true,
				show_tagcloud: true,
			},
			sentiments: {
				loading: true,
				module: null,
				neg: 0,
				pos: 0,
			},
			stream: {
				active: false,
				module: null,
				query: "",
			},
			tweet_modal: {
				show: false,
				tweet: null,
			},
			tweet_replies: [],
			tweets: [],
			tweets_loading: false,
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
		images() {
			return this.tweets
				.filter(( tweet ) => !!tweet.media?.images.length )
				.map(( tweet ) => tweet.media.images )
				.flat()
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
		this.initData()
		this.initEvents()
		this.initModules()
	},
	methods: {
		getReplies({ conversation_id }) {
			return new Promise(( resolve ) => {
				this.getTweets( "conversation_id:" + conversation_id ).then(( async_replies ) => {
					const conversation = new Tweets( async_replies )
					resolve( conversation.list )
				})
			})
		},
		getSentiments( tweets ) {
			this.sentiments.module.bufferAdd( tweets )
		},
		getTweets( query ) {
			this.tweets_loading = true
			return this.http_config.module.$get( SEARCH_ROUTE, { params: {
				query
			}}).finally(() => {
				this.tweets_loading = false
			})
		},
		initData() {
			this.tweets = []
			this.sentiments.loading = true
			this.sentiments.module?.bufferEmpty()
			this.sentiments.neg = 0
			this.sentiments.pos = 0
		},
		initEvents() {
			this.$nuxt.$on( "query", this.onQuery )
			this.$nuxt.$on( "toggle-stream", this.onStreamToggle )
			this.$nuxt.$on( "tweet-click", this.onTweetClick )
			this.$nuxt.$on( "tweet-modal-off", this.onTweetModalOff )
			this.onToggle( "toggle-map", "show_map" )
			this.onToggle( "toggle-media", "show_media" )
			this.onToggle( "toggle-tagcloud", "show_tagcloud" )
		},
		initModules() {
			this.sentiments.module = new Sentiments({
				http_route: SENTIMENT_ROUTE,
				http_config: this.http_config,
				buffer_page_size: this.client_configuration.SENTIMENT_PAGE_SIZE * 1,
				buffer_interval_duration: this.client_configuration.SENTIMENT_PAGE_INTERVAL * 1,
				onSetSentiment: this.onSentimentSet,
				onBufferEmpty: this.onSentimentsBufferEmpty,
			})
			this.stream.module = new Stream({
				http_route: STREAM_ROUTE,
				http_config: this.http_config,
				onProgress: this.onStreamProgress,
				onError: this.onStreamError
			})
		},
		async onQuery({ query }) {
			if ( !query ) { return } // Guard
			if (this.tweet_modal.show === true) {
				this.onTweetModalOff()
			}
			this.initData()
			const async_data = await this.getTweets( query )
			if ( !async_data.error ) {
				const tweets = new Tweets( async_data )
				this.tweets = tweets.list
				if ( tweets.list.length ) {
					this.getSentiments( tweets.list )
					this.setStreamQuery( query )
				} else {
					this.showAlertInfo( LABEL_INFO_EMPTY )
					this.streamStop( true )
				}
			} else {
				this.showAlertError( async_data.error.message || LABEL_ERROR_UNKNOWN )
			}
		},
		onSentimentsBufferEmpty() {
			this.sentiments.loading = false
		},
		onSentimentSet( _, sentiment ) {
			if ( sentiment.value > 0 ) {
				this.sentiments.pos += 1
			} else if ( sentiment.value < 0 ) {
				this.sentiments.neg += 1
			}
		},
		onStreamError( message ) {
			this.showAlertError( message )
		},
		onStreamProgress( async_data ) {
			const tweets = new Tweets( async_data )
			this.tweets = tweets.list.concat( this.tweets )
			this.getSentiments( tweets.list )
		},
		onStreamToggle( start ) {
			if ( start ) {
				this.streamStart( this.stream.query )
				this.stream.query = null
			} else {
				this.streamStop()
				this.tweets = [ ...this.tweets ] // Flush data
			}
			this.stream.active = start
		},
		onToggle( event, model ) {
			this.$nuxt.$on( event, ( toggle ) => {
				this.layout[ model ] = toggle
			})
		},
		async onTweetClick( tweet ) {
			this.tweet_replies = await this.getReplies( tweet )
			this.tweet_modal.tweet = tweet
			this.tweet_modal.show = true
		},
		onTweetModalOff() {
			this.tweet_modal.show = false
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
		streamStart( query ) {
			this.stream.active = true
			this.stream.module?.start( query )
			this.$nuxt.$emit( "stream-start" )
		},
		streamStop( disabled ) {
			this.stream.active = false
			this.stream.module?.stop()
			this.$nuxt.$emit( "stream-stop", { disabled })
		},
	},
}
