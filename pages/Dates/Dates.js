const WEEK_DAY = [ "dom", "lun", "mar", "mer", "gio", "ven", "sab" ]

class Dates {
	#dates_sorted
	#getDateGroup
	#oldest
	#newest

	#pad( num ) {
		return num < 10 ? `0${ num }` : num
	}

	/**
	 * Imposta la funzione da usare per #getDateGroup.
	 * #getDateGroup restituirà lo stesso nome-gruppo per date diverse.
	 * In questo modo possiamo raggruppare le date
	 * in base alla precisione richiesta:
	 * mese || giorno || ora || minuti || 20 secondi || 2 secondi
	 * La precisione è decisa in base alla differenza
	 * tra la data più recente e quella meno recente
	 */
	#setDateSlugFunction() {
		this.#getDateGroup = ( date ) =>
			this.#oldest.getMonth() !== this.#newest.getMonth()
				? `${ date.getMonth() + 1 }/${ this.#pad(date.getDate()) }`
				: this.#oldest.getDate() !== this.#newest.getDate()
					? `${ WEEK_DAY[ date.getDay() ] } ${ date.getDate() }`
					: this.#oldest.getHours() !== this.#newest.getHours()
						? `${ date.getHours() }:00`
						: this.#oldest.getMinutes() !== this.#newest.getMinutes()
							? `${ date.getHours() }:${ this.#pad(Math.floor(date.getMinutes() / 20 ) * 20 )}`
							: (Math.floor(this.#oldest.getSeconds() / 20) * 20) !== (Math.floor(this.#newest.getSeconds() / 20 ) * 20 )
								? `${ date.getHours() }:${ this.#pad(date.getMinutes()) }:${ this.#pad(Math.floor(date.getSeconds() / 2 ) * 2 )}`
								: `${ date.getHours() }:${ this.#pad(date.getMinutes()) }:${ this.#pad(Math.floor(date.getSeconds() / 20 ) * 20 )}`
	}

	makeLabelsValues( dates ) {
		this.#dates_sorted.forEach(( date ) => {
			const date_group = this.#getDateGroup( date )
			dates[ date_group ] = dates[ date_group ] ? dates[ date_group ] + 1 : 1
		})
	}

	constructor( dates ) {
		this.#dates_sorted = dates.sort(( a, b ) => a.getTime() > b.getTime())
		this.#oldest = this.#dates_sorted[ 0 ]
		this.#newest = this.#dates_sorted[ this.#dates_sorted.length - 1 ]
		this.#setDateSlugFunction()
	}

	get oldest() {
		return this.#oldest
	}

	get newest() {
		return this.#newest
	}
}

export default Dates
