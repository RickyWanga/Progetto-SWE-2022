const SLUG_DOMANDA = "_DOMANDA_"
const SLUG_RISPOSTA = "_RISPOSTA_"
const SLUG_PUNTO = "_PUNTO_"

class TriviaModel {
	#is_domanda = false
	#is_risposta = false
	#is_punto = false

	constructor( tweet_tags ) {
		const tags = tweet_tags.map(( tag ) => tag.toUpperCase())
		this.#is_domanda = tags.includes( SLUG_DOMANDA )
		this.#is_risposta = tags.includes( SLUG_RISPOSTA )
		this.#is_punto = tags.includes( SLUG_PUNTO )
	}

	get is_domanda() {
		return this.#is_domanda
	}

	get is_risposta() {
		return this.#is_risposta
	}

	get is_punto() {
		return this.#is_punto
	}
}

export default TriviaModel
