export default {
	props: [ "tweet" ],
	data() {
		return {

		}
	},
	computed: {
		dateFormat () {
			const date = new Date( this.tweet.date )
			return date.toLocaleString()
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
