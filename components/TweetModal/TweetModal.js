export default {
	props: [ "show" ],
	data() {
		return {
			on: false,
		}
	},
	updated() {
		this.on = this.show
	},
}
