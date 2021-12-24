export default {
	props: [ "tweet", "isModal" ],
	data() {
		return {

		}
	},
	methods: {
		check (tag) {
			const upper = tag.toUpperCase()
			return upper.startsWith('CONCORSO_')
		}
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.check)
		}
	},
}
