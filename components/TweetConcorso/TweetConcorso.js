export default {
	props: [ "replies", "tweet" ],
	data() {
		return {
			libri: [],
			utenti: {},
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
		libro() {
			return this.libri.find( libro => this.tweet.id === libro.id ) || { voti: 0 }
		},
		maxVoto() {
			const voti = this.libri.map( libro => libro.voti )
			return Math.max( ...voti )
		},
	},
	created() {
		this.countVoti()
	},
	methods: {
		initLibri() {
			this.libri = []
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_libro ) {
					this.libri.push({
						id: reply.id,
						label: reply.concorso.libro_id || reply.id,
						voti: 0,
					})
				}
			})
		},
		countVoti() {
			this.initLibri()
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_voto ) {
					const libro = this.libri.find( libro => reply.reference.id === libro.id )
					if ( libro ) {
						const libro_id = libro.id
						const utente_id = reply.user.account
						if ( !this.utenti[ utente_id ] ) {
							this.utenti[ utente_id ] = []
						}
						if ( this.utenti[ utente_id ].length < 10 && !this.utenti[ utente_id ].includes( libro_id )) {
							this.utenti[ utente_id ].push( libro_id )
							libro.voti += 1
						}
					}
				}
			})
			this.libri.sort(( a, b ) => b.voti - a.voti )
		},
	},
	watch: {
		replies() {
			this.countVoti()
		},
	},
}
