export default {
	data() {
		return {
			on: true,
		}
	},
	watch: {
		on( val ) {
			if ( !val ) {
				this.vModalOff()
			}
		}
	},
	methods: {
		vModalOff() {
			this.$nuxt.$emit( "tweet-modal-off" )
		}
	},
}
