export default {
	props: [ "replies", "tweet" ],
	data() {
		return {
			libri: [],
			voti: {},
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
		initVoti() {
			this.voti = {}
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_voto ) {
					const utente_id = reply.user.account
					this.voti[ utente_id ] = []
				}
			})
		},
		countVoti() {
			this.initLibri()
			this.initVoti()
			this.replies.forEach(( reply ) => {
				if ( reply.concorso.is_voto ) {
					const libro = this.libri.find( libro => reply.reference.id === libro.id )
					if ( libro ) {
						const libro_id = libro.id
						const utente_id = reply.user.account
						if ( this.voti[ utente_id ].length < 10 && !this.voti[ utente_id ].includes( libro_id )) {
							this.voti[ utente_id ].push( libro_id )
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
