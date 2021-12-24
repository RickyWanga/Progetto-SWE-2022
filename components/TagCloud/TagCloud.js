import VueWordCloud from "vuewordcloud"

export default {
	props: [ "tags" ],
	data() {
		return {
			fontFamily: "sans-serif",
			fontSizeRatio: 5,
			rotation: this.rotationFunction,
		}
	},
	computed: {
		color() {
			return this.colorFunction( this.words )
		},
		words() {
			return this.tags.slice(0, 50)
		},
	},
	components: {
		VueWordCloud,
	},
	methods: {
		colorFunction( words ) {
			const values = words
				.sort(( a, b ) => a[ 1 ] < b[ 1 ])
				.reduce(( p, c ) => ( p[p.length - 1] !== c[1]) ? p.concat( c[1] ) : p, [] )
			return ([, weight]) => {
				switch ( weight ) {
				case values[ 0 ]:
					return "DeepPink"
				case values[ 1 ]:
					return "RoyalBlue"
				case values[ 2 ]:
					return "Indigo"
				default:
					return "CornflowerBlue"
				}
			}
		},
		rotationFunction( word, index ) {
			return index > 3 ? ( 3 / 4 * Math.round(Math.random())) : 0
		},
	},
}
