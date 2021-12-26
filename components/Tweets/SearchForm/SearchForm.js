export default {
	props: [ "loading" ],
	data() {
		return {
			query: null,
			queryRules: [ v => !!v ],
			valid: false,
			today: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			time: 'T00%3a00%3a00Z',
			dates: [],
			menu: false,
			allowedDates: val => val <= this.today,
		}
	},
	computed: {
		dateRangeText () {
			return this.dates.join(' ~ ')
		},
	},
	mounted() {
		this.$nuxt.$on( "query", ({ query }) => {
			let slice = query
			if (query.includes('&')) {
				const index = slice.indexOf('&')
				slice = slice.slice(0, index)
			}
			this.query = slice
		})
	},
	methods: {
		submit() {
			let query = this.query
			if (this.dates[0]) {
				query = query + "&start_time=" + this.dates[0] + this.time
			}
			if (this.dates[1]) {
				query = query + "&end_time=" + this.dates[1] + this.time
			}
			this.$nuxt.$emit( "query", { query })
		},
	},
	watch: {
		dates(val) {
			if (val[0] > val[1]) {
				const tmp = val[0]
				val[0] = val[1]
				val[1] = tmp
			}
		}
	}
}
