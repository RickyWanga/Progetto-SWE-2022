export default {
	props: [ "tweet", "isModal", "isReplyModal" ],
	data() {
		return {

		}
	},
	methods: {
		checkC (tag) {
			const upper = tag.toUpperCase()
			return upper.startsWith('CONCORSO_')
		},
		checkS (tag) {
			const upper = tag.toUpperCase()
			return upper.startsWith('LIBRO_')
		},
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.checkC)
		},
		checkScrittore () {
			return this.tweet.tags.some(this.checkS)
		}
	},
}
