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
		},
		cut (word) {
			let index = word.length
			if (word.includes(':')) {
				index--
			}
			return word.slice(1, index)
		}
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.check)
		}
	},
}
