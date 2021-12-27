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
			return this.dateRange.length ? new Date( this.dateRange[0] ).toISOString() : null
		},
		twitterDateTo() {
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
				return date.toISOString()
			} else {
				return null
			}
		},
	},
	mounted() {
		this.$nuxt.$on( "query", ({ query }) => {
			this.query = query
		})
	},
	methods: {
		submit() {
			this.$nuxt.$emit( "query", {
				end_time: this.twitterDateTo,
				query: this.query,
				start_time: this.twitterDateFrom,
			})
		},
	},
}
