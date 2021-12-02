export default {
	props: [ "sentiment" ],
	data() {
		return {
			colors: {
				positive: "teal",
				negative: "pink",
				neutral: "grey lighten-2",
			}
		}
	},
	computed: {
		color() {
			if ( 0 < this.sentiment.value ) {
				return this.colors.positive
			} else if ( 0 > this.sentiment.value ) {
				return this.colors.negative
			} else {
				return this.colors.neutral
			}
		}
	}
}
