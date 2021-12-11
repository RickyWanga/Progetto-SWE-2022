export default {
	props: [ "show" ],
	data() {
		return {
			on: false,
		}
	},
	updated() {
		this.onoff()
	},
	methods: {
		onoff() {
			this.$nextTick(() => {
				this.on = this.show
			})
		},
		vModelOff() {
			this.$nuxt.$emit("tweet-modal-off")
		}
	},
	watch: {
		on( val ) {
			if (!val) {
				this.vModelOff()
			}
		}
	}
}
