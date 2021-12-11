import DateGroups from "~/classes/DateGroups"
import Raccoglitore from "~/classes/Raccoglitore"

const CLIENT_CONFIGURATION_ROUTE = "/api/client-configuration"
const SEARCH_ROUTE = "/api/twitter/search"
const SENTIMENT_ROUTE = "/api/sentiment"
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
			loading_sentiments: false,
			loading_tweets: false,
			sentiments_pos: 0,
			sentiments_neg: 0,
			show_map: true,
			show_media: true,
			show_tagcloud: true,
			tweet_modal_show: false,
			tweet_modal_tweet: [],
			tweets: [],
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
				.filter(( tweet ) => tweet.geo.target )
				.map(( tweet ) => tweet.geo )
		},
		media() {
			return this.tweets && this.tweets.media
		},
		sentiment() {
			return {
				positive: Math.round(( this.sentiments_pos * 100 ) / ( this.tweets.length || 1 )),
				negative: Math.round(( this.sentiments_neg * 100 ) / ( this.tweets.length || 1 )),
			}
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
		this.$nuxt.$on( "query", this.onQuery )
		this.$nuxt.$on( "tweet-click", this.onTweetClick )
		this.$nuxt.$on( "tweet-modal-off", this.onTweetModalOff )
		this.onToggle( "toggle-map", "show_map" )
		this.onToggle( "toggle-media", "show_media" )
		this.onToggle( "toggle-tagcloud", "show_tagcloud" )
	},
	methods: {
		getSentimentAsync( tweet ) {
			return new Promise(( resolve ) => {
				this.$axios.$get( SENTIMENT_ROUTE, { params: {
					text: tweet.text,
				}}).then(( sentiment = {}) => {
					if ( sentiment.score ) {
						sentiment.value = sentiment.score
						sentiment.score = Math.round(Math.abs( sentiment.score ) * 100 ).toString()
					} else {
						sentiment = { score: "0", value: 0 }
					}
					resolve( sentiment )
				})
			})
		},
		getTweets( query ) {
			this.loading_tweets = true
			this.init()
			return this.$axios.$get( SEARCH_ROUTE, { params: {
				query
			}}).finally(() => {
				this.loading_tweets = false
			})
		},
		init() {
			this.tweets = []
			this.sentiments_pos = 0
			this.sentiments_neg = 0
		},
		async onQuery({ query }) {
			if ( !query ) { return } // Guard
			const async_data = await this.getTweets( query )
			if ( !async_data.error ) {
				const raccoglitore = new Raccoglitore( async_data )
				this.tweets = raccoglitore.tweets
				if ( raccoglitore.tweets.length ) {
					this.setSentimentsAsync()
				} else {
					this.showAlertInfo( LABEL_INFO_EMPTY )
				}
			} else {
				this.showAlertError( async_data.error.message || LABEL_ERROR_UNKNOWN )
			}
		},
		onToggle( event, model ) {
			this.$nuxt.$on( event, ( toggle ) => {
				this[ model ] = toggle
			})
		},
		onTweetClick( tweet ) {
			this.tweet_modal_tweet = tweet
			this.tweet_modal_show = true
		},
		onTweetModalOff() {
			this.tweet_modal_show = false
		},
		setSentiment( tweet, sentiment ) {
			if ( sentiment.value > 0 ) {
				this.sentiments_pos += 1
			} else if ( sentiment.value < 0 ) {
				this.sentiments_neg += 1
			}
			tweet.sentiment = sentiment
		},
		setSentimentsAsync( page = 0 ) {
			const page_size = this.client_configuration.SENTIMENT_PAGE_SIZE * 1
			const page_interval = this.client_configuration.SENTIMENT_PAGE_INTERVAL * 1
			const max_page_number = Math.ceil( this.tweets.length / page_size )
			const start_index = page * page_size
			if ( page < max_page_number ) {
				this.loading_sentiments = true
				const page_tweets = this.tweets.slice( start_index, start_index + page_size )
				page_tweets.forEach(( tweet ) => {
					this.getSentimentAsync( tweet ).then(( sentiment ) => {
						this.setSentiment( tweet, sentiment )
					})
				})
				setTimeout( this.setSentimentsAsync, page_interval, page + 1 )
			} else {
				this.loading_sentiments = false
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
