export default {
	props: [ "tweet", "isModal", "isReplyModal" ],
	data() {
		return {
			libro: undefined,
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
		checkV (tag) {
			const upper = tag.toUpperCase()
			this.libro = upper.substring(5)
			return upper.startsWith('VOTO_')
		},
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.checkC)
		},
		checkScrittore () {
			return this.tweet.tags.some(this.checkS)
		},
		checkVoto () {
			return this.tweet.tags.some(this.checkV)
		},
	},
}
