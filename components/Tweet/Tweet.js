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
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.check)
		},
		dateFormat () {
			const date = new Date( this.tweet.date )
			return `${ date.getHours() }:${ date.getMinutes() } ${ date.getDate() } ${ new Intl.DateTimeFormat('it-EU', { month: 'short' }).format(date) } ${ date.getFullYear() }`
		},
		words() {
			let re = null
			let re_pattern = ""
			if ( this.tweet.mentions.length ) {
				re_pattern += "@" + this.tweet.mentions.join( "|@" )
			}
			if ( this.tweet.tags.length ) {
				re_pattern += re_pattern ? "|" : ""
				re_pattern += "#" + this.tweet.tags.join( "|#" )
			}
			if ( re_pattern ) {
				re = new RegExp( `(${ re_pattern })`, "g" )
			}
			return this.tweet.text.split( re )
		},
	},
}
