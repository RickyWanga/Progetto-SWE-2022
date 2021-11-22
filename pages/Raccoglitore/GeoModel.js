class GeoModel {
	#latlng = []
	#place_name = ""
	#place_country = ""
	#target = 0
	#tooltip = ""

	#getCoordinates( status ) {
		if ( status && status.geo ) {
			return {
				latlng: status.geo.coordinates,
				place: status.place,
			}
		} else if ( status && status.place ) {
			return {
				latlng: [
					status.place.bounding_box.coordinates[ 0 ][ 0 ][ 1 ],
					status.place.bounding_box.coordinates[ 0 ][ 0 ][ 0 ]
				],
				place: status.place,
			}
		} else {
			return null
		}
	}

	constructor( status ) {
		let coordinates = this.#getCoordinates( status )
		if ( !coordinates ) {
			coordinates = this.#getCoordinates( status.retweeted_status )
		}
		if ( coordinates ) {
			this.#latlng = coordinates.latlng
			this.#place_name = coordinates.place.full_name
			this.#place_country = coordinates.place.country
			this.#target = status.id
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
