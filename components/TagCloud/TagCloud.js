import Chance from "chance"
import VueWordCloud from "vuewordcloud"

export default {
	props: [ "tags" ],
	data() {
		return {
			fontFamily: "sans-serif",
			rotation: this.rotationFunction,
		}
	},
	computed: {
		color() {
			return this.colorFunction( this.words )
		},
		words() {
			return this.tags
		},
	},
	components: {
		VueWordCloud,
	},
	methods: {
		colorFunction( words ) {
			// Sorted array of tags counts [ 4, 2, 1 ]
			return ([, weight]) => {
				const values = words
					.sort(( a, b ) => a[ 1 ] < b[ 1 ])
					.reduce(( p, c ) => ( p[p.length - 1] !== c[1]) ? p.concat( c[1] ) : p, [] )
				return weight > values[ 2 ] ? 'DeepPink' : weight > values[ 4 ] ? 'RoyalBlue' : 'Indigo'
			}
		},
		rotationFunction( word ) {
			const chance = new Chance( word[0] )
			return chance.pickone([ 0, 3 / 4 ])
		},
	},
}
