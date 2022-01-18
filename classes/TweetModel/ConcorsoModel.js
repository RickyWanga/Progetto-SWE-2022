const SLUG_CONCORSO = "_CONCORSO_"
const SLUG_LIBRO = "_LIBRO_"
const SLUG_VOTO = "_VOTO_"

class ConcorsoModel {
	#is_concorso = false
	#is_libro = false
	#is_voto = false
	#libro_id = ""

	constructor( tweet_tags ) {
		const tags = tweet_tags.map(( tag ) => tag.toUpperCase())
		const libro = tags.find(( tag ) => tag.startsWith(SLUG_LIBRO))
		this.#is_concorso = tags.includes( SLUG_CONCORSO )
		this.#is_libro = !!libro
		this.#is_voto = tags.includes( SLUG_VOTO )
		if ( this.#is_libro ) {
			this.#libro_id = libro.replace( SLUG_LIBRO, "" )
		}
	}

	get is_concorso() {
		return this.#is_concorso
	}

	get is_libro() {
		return this.#is_libro
	}

	get is_voto() {
		return this.#is_voto
	}

	get libro_id() {
		return this.#libro_id
	}
}

export default ConcorsoModel
