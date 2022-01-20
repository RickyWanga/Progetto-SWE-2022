export default {
	props: [ "replies", "tweet" ],
	data() {
		return {
			num_r: 0,
			num_p: 0,
			punti: {
				utente: {},
			},
		}
	},
	computed: {
		isDomanda() {
			return this.tweet.trivia.is_domanda
		},
		isRisposta() {
			return this.tweet.trivia.is_risposta
		},
		isPunto() {
			return this.tweet.concorso.is_punto
		},
	},
	created() {
		this.countRisposte()
		this.countPunti()
	},
	methods: {
		countRisposte() {
			this.replies.forEach(( reply ) => {
				if ( reply.trivia.is_risposta ) {
					this.num_r += 1
				}
			})
		},
		countPunti(){
			this.replies.forEach(( reply ) => {
				if ( reply.trivia.is_punto ) {
					this.num_p += 1
				}
			})
		}
	},
	watch: {
		replies() {
			this.countRisposte()
			this.countPunti()
		},
	},
}
