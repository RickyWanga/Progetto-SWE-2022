class GeoModel {
	#latlng = []
	#place_name = ""
	#place_country = ""
	#target = 0
	#tooltip = ""

	#getCoordinates( tweet ) {
		if ( tweet.geo && tweet.geo.coordinates ) {
			return {
				latlng: tweet.geo.coordinates.coordinates.reverse(),
				place: tweet.geo.place_expansion,
			}
		} else if ( tweet.geo && tweet.geo.place_expansion ) {
			const bbox = tweet.geo.place_expansion.geo.bbox
			const lat = ( bbox[ 1 ] + bbox[ 3 ] ) / 2
			const lng = ( bbox[ 0 ] + bbox[ 2 ] ) / 2
			return {
				latlng: [ lat, lng ],
				place: tweet.geo.place_expansion,
			}
		} else {
			return null
		}
	}

	constructor( tweet ) {
		const coordinates = this.#getCoordinates( tweet || {} )
		if ( coordinates ) {
			this.#latlng = coordinates.latlng
			this.#place_name = coordinates.place.full_name
			this.#place_country = coordinates.place.country
			this.#target = tweet.id
			this.#tooltip = `${ coordinates.place.full_name } - ${ coordinates.place.country }`
		}
	}

	get latlng() {
		return this.#latlng
	}

	get place_name() {
		return this.#place_name
	}

	get place_country() {
		return this.#place_country
	}

	get target() {
		return this.#target
	}

	get tooltip() {
		return this.#tooltip
	}
}

export default GeoModel
