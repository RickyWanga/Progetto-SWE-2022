export default {
	props: [ "media", "show" ],
	data() {
		return {
			imgWidth: "50%"
		}
	},
	watch: {
		show(val) {
			if (val) {
				this.imgWidth = "50%"
			} else {
				this.imgWidth = "25%"
			}
		}
	}
}
