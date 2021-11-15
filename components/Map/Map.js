import Vue from 'vue'
import { LMap, LTileLayer } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)

export default {
	name: 'Map',
	el: '#vue-app',
	components: {
		LMap,
		LTileLayer
	},
	data () {
		return {
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			zoom: 1,
			center: [0, 0],
			isShow: true,
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
