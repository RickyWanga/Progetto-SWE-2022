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
	},
	created() {
		this.countVoti()
	},
	methods: {
		countVoti() {
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_voto ) {
					const libro_id = reply.reference.id.toString()
					const utente_id = reply.user.account
					if ( !this.voti.libro[ libro_id ] ) {
						this.voti.libro[ libro_id ] = 0
					}
					if ( !this.voti.utente[ utente_id ] ) {
						this.voti.utente[ utente_id ] = []
					}
					if ( this.voti.utente[ utente_id ].length < 10 && !this.voti.utente[ utente_id ].includes( libro_id )) {
						this.voti.utente[ utente_id ].push( libro_id )
						this.voti.libro[ libro_id ] += 1
					}
				}
			})
		},
	},
}
