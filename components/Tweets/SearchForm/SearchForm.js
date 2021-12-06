export default {
	props: [ "loading" ],
	data() {
		return {
			query: null,
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
