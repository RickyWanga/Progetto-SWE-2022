const GRADIENTS = [
	[ "#222" ],
	[ "#42b3f4" ],
	[ "red", "orange", "yellow" ],
	[ "purple", "violet" ],
	[ "#00c6ff", "#F0F", "#FF0" ],
	[ "#f72047", "#ffd200", "#1feaea" ],
]

export default {
	props: [ "label-value" ],
	data() {
		return {
			autoDrawDuration: 1000,
			autoLineWidth: true,
			fill: false,
			gradient: GRADIENTS[ 5 ],
			gradientDirection: "bottom",
			lineWidth: 2,
			padding: 8,
			smooth: 10,
			strokeLineCap: "round",
			type: "trend", // "bars"
		}
	},
	computed: {
		labels() {
			return this.labelValue.labels
		},
		values() {
			return this.labelValue.values
		},
	},
}
