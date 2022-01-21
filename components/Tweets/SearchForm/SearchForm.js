export default {
	props: [ "loading", "search-button-message" ],
	data() {
		return {
			query: null,
			queryRules: [ v => !!v ],
			valid: false,
			dateMaxDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			dateMenu: false,
			dateRangeInput: [],
		}
	},
	computed: {
		dateRange() {
			if ( this.dateRangeInput[0] > this.dateRangeInput[1] ) {
				return [ this.dateRangeInput[1], this.dateRangeInput[0] ]
			} else {
				return this.dateRangeInput
			}
		},
		dateRangeText() {
			return this.dateRange.join(' ~ ')
		},
		twitterDateFrom() {
			let twitter_date = null
			if ( this.dateRange.length ) {
				twitter_date = new Date( this.dateRange[0] ).toISOString()
			}
			return twitter_date
		},
		twitterDateTo() {
			let twitter_date = null
			if ( this.dateRange.length ) {
				let date
				if ( 2 === this.dateRange.length ) {
					date = new Date( this.dateRange[1] )
				} else {
					date = new Date( this.dateRange[0] )
				}
				if ( !this.isToday( date )) {
					// Set end-time to 23:59:59
					date.setHours( 23 )
					date.setMinutes( 59 )
					date.setSeconds( 59 )
				} else {
					// Set end-date to now - 11s
					date = new Date( Date.now() - 11000 )
				}
				twitter_date = date.toISOString()
			}
			return twitter_date
		},
	},
	mounted() {
		this.$nuxt.$on( "query:update", ({ query }) => {
			this.dateRangeInput = []
			this.query = query
			this.submit()
		})
	},
	methods: {
		isToday( date ) {
			const now = new Date( Date.now() )
			return now.getDate() === date.getDate() &&
				now.getMonth() === date.getMonth() &&
				now.getFullYear() === date.getFullYear()
		},
		submit() {
			this.$nuxt.$emit( "query:submit", {
				end_time: this.twitterDateTo,
				query: this.query,
				start_time: this.twitterDateFrom,
			})
		},
	},
}
