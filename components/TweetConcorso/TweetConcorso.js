export default {
	props: [ "replies", "tweet" ],
	data() {
		return {
			voti: {
				utente: {},
				libro: {},
			},
		}
	},
	computed: {
		isConcorso() {
			return this.tweet.concorso.is_concorso
		},
		isLibro() {
			return this.tweet.concorso.is_libro
		},
		isVoto() {
			return this.tweet.concorso.is_voto
		},
		maxVoto() {
			let max = 0
			Object.values( this.voti.libro ).forEach((libro) => {
				if (libro > max) {
					max = libro
				}
			})
			return max
		},
		getOrdinato() {
			const voti = Object.keys( this.voti.libro ).map(( libro_id ) => {
				return {
					libro_id,
					libro_voti: this.voti.libro[ libro_id ],
				}
			})
			voti.sort(( b, a ) => a.libro_voti - b.libro_voti )
			return voti
		},
	},
	created() {
		this.countVoti()
	},
	methods: {
		initLibri() {
			this.voti = {
				utente: {},
				libro: {},
			}
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_libro ) {
					const libro_id = reply.concorso.libro_id
					this.voti.libro[ libro_id ] = 0
				}
			})
		},
		countVoti() {
			this.initLibri()
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_voto ) {
					const libro_id = reply.reference.id.toString()
					const utente_id = reply.user.account
					if ( "undefined" !== typeof this.voti.libro[ libro_id ] ) {
						if ( !this.voti.utente[ utente_id ] ) {
							this.voti.utente[ utente_id ] = []
						}
						if ( this.voti.utente[ utente_id ].length < 10 && !this.voti.utente[ utente_id ].includes( libro_id )) {
							this.voti.utente[ utente_id ].push( libro_id )
							this.voti.libro[ libro_id ] += 1
						}
					}
				}
			})
		},
	},
	watch: {
		replies() {
			this.countVoti()
		},
	},
}
