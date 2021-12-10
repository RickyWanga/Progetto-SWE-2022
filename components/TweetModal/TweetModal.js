export default {
	props: [ "show" ],
	data() {
		return {
			on: false,
		}
	},
	mounted() {
		this.on = this.show
	},
}
