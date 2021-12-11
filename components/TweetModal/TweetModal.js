export default {
	data() {
		return {
			on: true,
		}
	},
	watch: {
		on( val ) {
			if (!val) {
				this.vModelOff()
			}
		}
	},
	methods: {
		vModelOff() {
			this.$nuxt.$emit( "tweet-modal-off" )
		}
	},
}
