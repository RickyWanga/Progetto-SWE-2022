export default {
	props: [ "loading", "progress1", "progress2" ],
	data() {
		return {
			color1: "teal",
			color2: "pink",
			lighten: "lighten-3",
		}
	},
	computed: {
		tooltip() {
			return `${ this.progress1 }% ` +
				`${ 100 - this.progress1 - this.progress2 }% ` +
				`${ this.progress2 }% `
		},
		diagramColor1() {
			return !this.loading ? this.color1 : `${ this.color1 } ${ this.lighten }`
		},
		diagramColor2() {
			return !this.loading ? this.color2 : `${ this.color2 } ${ this.lighten }`
		},
	},
}
