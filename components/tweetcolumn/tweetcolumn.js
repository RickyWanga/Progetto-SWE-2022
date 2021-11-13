export default {
	data () {
		return {
			loading: true
		}
	},
	mounted() {
		this.loading = true
		setTimeout(() => {
			this.loading = false
		}, 1200)
	}
}
