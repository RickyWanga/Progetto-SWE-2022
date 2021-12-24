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
			if ( !this.tweets_loading ) {
				const tweets_dates = this.tweets.map(( tweet ) => new Date( tweet.date ))
				if ( tweets_dates.length > 1 ) {
					new DateGroups( tweets_dates ).makeLabelsValues( dates )
				}
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
			const total = ( this.sentiments.loading ? this.sentiments.pos + this.sentiments.neg : this.tweets.length ) || 1
			return {
				positive: Math.round(( this.sentiments.pos * 100 ) / total ),
				negative: Math.round(( this.sentiments.neg * 100 ) / total ),
			}
		},
		tags() {
			const tags = {}
			if ( !this.tweets_loading ) {
				this.tweets.forEach(( tweet ) => tweet.tags?.forEach( tag => {
					const tag_slug = tag.toLowerCase()
					tags[ tag_slug ] = tags[ tag_slug ] ? tags[ tag_slug ] + 1 : 1
				}))
			}
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
		getSentiments( tweets, has_priority ) {
			this.sentiments.module.bufferAdd( tweets, has_priority )
		},
		getTweets( query, next_token, max_results ) {
			return this.http_config.module.$get( SEARCH_ROUTE, { params: {
				query,
				next_token,
				max_results,
			}})
		},
		initData() {
			this.tweets = []
			this.sentiments.loading = true
			this.sentiments.module?.bufferEmpty()
			this.sentiments.neg = 0
			this.sentiments.pos = 0
			this.tweet_modal.show = false
		},
		initEvents() {
			this.$nuxt.$on( "max_results:change", this.onMaxResultsChange )
			this.$nuxt.$on( "media-click", this.onMediaClick )
			this.$nuxt.$on( "query", this.onQuery )
			this.$nuxt.$on( "toggle-stream", this.onStreamToggle )
			this.$nuxt.$on( "open-modal", this.openModal )
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
		loopNextResults({ query, async_data, max_results }) {
			const next_token = async_data.meta?.next_token
			max_results = max_results - async_data.meta?.result_count
			if ( next_token && max_results > 0 ) {
				this.onQuery({ query, max_results, next_token })
			}
		},
		onMaxResultsChange( val ) {
			this.max_results = val
		},
		async onQuery({ query, next_token, max_results }) {
			if ( !query ) { return } // Guard
			if ( !next_token ) {
				this.initData()
			}
			if ( !max_results ) {
				max_results = this.max_results
			}
			this.tweets_loading = true
			const async_data = await this.getTweets( query, next_token, max_results ).finally(() => {
				this.tweets_loading = false
			})
			if ( !async_data.error ) {
				if ( async_data.data?.length ) {
					async_data.data = async_data.data?.slice( 0, max_results )
					const tweets = new Tweets( async_data )
					this.tweets = this.tweets.concat( tweets.list )
					this.getSentiments( tweets.list )
					this.setStreamQuery( query )
					this.loopNextResults({ query, async_data, max_results })
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
		onSentimentSet( tweet, sentiment ) {
			tweet.sentiment = sentiment
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
			this.getSentiments( tweets.list, true )
		},
		onStreamToggle( start ) {
			if ( start ) {
				this.streamStart( this.stream.query )
				this.stream.query = null
			} else {
				this.streamStop()
				this.tweets = [ ...this.tweets ] // Flush data
			}
		},
		onToggle( event, model ) {
			this.$nuxt.$on( event, ( toggle ) => {
				this.layout[ model ] = toggle
			})
		},
		async openModal( tweet ) {
			let found = tweet
			if ( typeof found !== 'object' ) {
				found = this.tweets.find( tweet => tweet.id === found )
			}
			this.tweet_replies = await this.getReplies( found )
			this.tweet_modal.tweet = found
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
