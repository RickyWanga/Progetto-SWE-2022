export default {
	props: [ "loading" ],
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
				date.setHours( 23 )
				date.setMinutes( 59 )
				date.setSeconds( 59 )
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
		submit() {
			this.$nuxt.$emit( "query:submit", {
				end_time: this.twitterDateTo,
				query: this.query,
				start_time: this.twitterDateFrom,
			})
		},
	},
}
