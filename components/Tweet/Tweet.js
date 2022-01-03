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
