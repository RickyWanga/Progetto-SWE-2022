import Chance from "chance"
import VueWordCloud from "vuewordcloud"

const colorFunction = ([, weight]) => {
	const values = wordsTest.reduce(( p, c ) => ( p[p.length-1] !== c[1]) ? p.concat( c[1] ) : p, [] )
	return weight === values[ 0 ] ? 'DeepPink' : weight === values[ 1 ] ? 'RoyalBlue' : 'Lime'
}

const rotationFunction = ( word ) => {
	const chance = new Chance( word[0] )
	return chance.pickone([ 0, 3/4 ])
}

const wordsTest = [
	[ "hi", 9 ],
	[ "jepa", 9 ],
	[ "vocjo", 9 ],
	[ "zalaj", 4 ],
	[ "kokujra", 4 ],
	[ "be", 4 ],
	[ "kicnaap", 4 ],
	[ "ruc", 4 ],
	[ "wuwwis", 4 ],
	[ "gidme", 4 ],
	[ "opsofac", 4 ],
	[ "wel", 4 ],
	[ "sivahpeg", 4 ],
	[ "inje", 4 ],
	[ "juwreli", 4 ],
	[ "mikuv", 4 ],
	[ "emveba", 2 ],
	[ "bikcupugi", 2 ],
	[ "nez", 2 ],
	[ "tah", 2 ],
	[ "begec", 2 ],
	[ "picipgo", 2 ],
	[ "egive", 2 ],
	[ "gico", 2 ],
	[ "piur", 2 ],
	[ "arnu", 2 ],
	[ "ekezathi", 1 ],
	[ "vu", 1 ],
	[ "dirom", 1 ],
	[ "se", 1 ],
	[ "zivemaj", 1 ],
]

export default {
	data() {
		return {
			color: colorFunction,
			fontFamily: "sans-serif",
			rotation: rotationFunction,
			words: wordsTest,
		}
	},
	components: {
		VueWordCloud,
	},
}
