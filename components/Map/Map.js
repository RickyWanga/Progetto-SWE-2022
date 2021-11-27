export default {
	props: [ "geo" ],
	data() {
		return {
			attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			center: [ 44.49801332451893, 11.355900447715872 ], // Bologna
			maxBounds: [[-90, -180], [90, 180]],
			minZoom: 2,
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			zoom: 4,
		}
	},
	computed: {
		latlng() {
			return this.geo.map( geo => [ geo.latlng[0], geo.latlng[1] ])
		},
	},
	mounted() {
		this.$nuxt.$on( "toggle-media", this.resizeMap )
		this.$nuxt.$on( "toggle-tagcloud", this.resizeMap )
	},
	updated() {
		this.setNewBounds()
	},
	methods: {
		resizeMap() {
			this.$nextTick(() => {
				if ( this.$refs.map ) {
					this.$refs.map.mapObject.invalidateSize( true )
				}
			})
		},
		setNewBounds() {
			this.$nextTick(() => {
				if ( this.latlng.length && this.$refs.map ) {
					this.$refs.map.mapObject.flyToBounds( this.latlng, { maxZoom: 7 })
				}
			})
		},
	},
}
