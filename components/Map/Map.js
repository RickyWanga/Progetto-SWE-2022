export default {
	props: [ "geo" ],
	data () {
		return {
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			zoom: 4,
			center: [ 44.49801332451893, 11.355900447715872 ], // Bologna,
			show: false,
			loading: true,
		}
	},
	mounted() {
		this.show = true
	},
	created() {
		this.$nuxt.$on( 'toggle-media', ( toggle ) => {
			this.$nextTick(() => {
				this.$refs.map && this.$refs.map.mapObject.invalidateSize( true )
			})
		})
		this.$nuxt.$on( 'toggle-tagcloud', ( toggle ) => {
			this.$nextTick(() => {
				this.$refs.map && this.$refs.map.mapObject.invalidateSize( true )
			})
		})
	},
	methods: {
		SetNewBounds() {
			this.$nextTick(() => {
				this.$refs.map.mapObject.fitBounds(this.geo.map(m => { return [m.lat, m.lng] }))
			})
		}
	}
}
