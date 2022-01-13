const SLUG_CONCORSO = "_CONCORSO_"
const SLUG_LIBRO = "_LIBRO_"
const SLUG_VOTO = "_VOTO_"

class ConcorsoModel {
	#is_concorso = false
	#is_libro = false
	#is_voto = false

	constructor( tweet_tags ) {
		const tags = tweet_tags.map(( tag ) => tag.toUpperCase())
		this.#is_concorso = tags.includes( SLUG_CONCORSO )
		this.#is_libro = tags.includes( SLUG_LIBRO )
		this.#is_voto = tags.includes( SLUG_VOTO )
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
}

export default ConcorsoModel
