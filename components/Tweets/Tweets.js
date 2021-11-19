export default {
	props: [ "loading", "tweets" ],
	data() {
		return {
			query: "",
			queryRules: [ v => !!v ],
			valid: false,
		}
	},
	methods: {
		submit() {
			this.$nuxt.$emit( "query", { query: this.query })
		},
	}
}
