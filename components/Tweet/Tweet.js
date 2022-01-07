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
		},
		dateFormat () {
			const date = new Date( this.tweet.date )
			return `${ date.getHours() }:${ date.getMinutes() } ${ date.getDate() } ${ new Intl.DateTimeFormat('it-EU', { month: 'short' }).format(date) } ${ date.getFullYear() }`
		}
	},
}
