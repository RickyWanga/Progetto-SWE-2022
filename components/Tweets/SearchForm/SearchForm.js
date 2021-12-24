export default {
	props: [ "loading" ],
	data() {
		return {
			query: null,
			queryRules: [ v => !!v ],
			valid: false,
		}
	},
	mounted() {
		this.$nuxt.$on( "query", ({ query }) => {
			this.query = query
		})
	},
	methods: {
		submit() {
			this.$nuxt.$emit( "query", { query: this.query })
		},
	}
}
