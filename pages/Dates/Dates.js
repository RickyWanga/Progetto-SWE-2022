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
	 * anno || mese || giorno || ora || minuti || secondi
	 * La precisione è decisa in base alla differenza
	 * tra la data più recente e quella meno recente
	 */
	#setDateSlugFunction() {
		const date_diff = new Date( this.#newest - this.#oldest )
		const date_diff_years = date_diff.getUTCFullYear() - 1970
		const date_diff_months = date_diff.getUTCMonth()
		const date_diff_days = date_diff.getUTCDate() - 1
		const date_diff_hours = date_diff.getUTCHours()
		const date_diff_minutes = date_diff.getUTCMinutes()
		this.#getDateGroup = ( date ) => {
			if ( date_diff_years ) {
				return `${ this.#pad(date.getDate()) }/${ this.#pad(date.getMonth() + 1) }/${ date.getFullYear() }/`
			} else if ( date_diff_months ) {
				return `${ date.getMonth() + 1 }/${ this.#pad(date.getDate()) }`
			} else if ( date_diff_days ) {
				return `${ WEEK_DAY[ date.getDay() ] } ${ date.getDate() }`
			} else if ( date_diff_hours > 2 ) {
				return `${ date.getHours() }:00`
			} else if ( date_diff_hours || date_diff_minutes > 4 ) {
				return `${ date.getHours() }:${ this.#pad(date.getMinutes()) }`
			} else {
				return `${ date.getHours() }:${ this.#pad(date.getMinutes()) }:${ this.#pad(date.getSeconds()) }`
			}
		}
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
