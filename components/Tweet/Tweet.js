export default {
	props: [ "tweet" ],
	data() {
		return {

		}
	},
	methods: {
		Check (tag) {
			const upper = tag.toUpperCase()
			return upper.startsWith('CONCORSO_')
		}
	},
}
