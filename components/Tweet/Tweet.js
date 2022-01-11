export default {
	props: [ "tweet", "isModal", "isReplyModal" ],
	data() {
		return {
			libro: '',
			concorso: '',
			voto: '',
			voti: {},
			libri: {},
		}
	},
	methods: {
		checkC (tag) {
			const upper = tag.toUpperCase()
			const isconcorso = upper.startsWith('CONCORSO_')
			if ( isconcorso ) {
				this.concorso = upper.substring(9)
			}
			return isconcorso
		},
		checkS (tag) {
			const upper = tag.toUpperCase()
			const islibro = upper.startsWith('LIBRO_')
			if ( islibro ) {
				this.libro = upper.substring(6)
				this.$nuxt.$emit( 'concorso:libro', { libro: this.libro })
			}
			return islibro
		},
		checkV (tag) {
			const upper = tag.toUpperCase()
			const isvoto = upper.startsWith('VOTO_')
			if ( isvoto ) {
				this.voto = upper.substring(5)
				this.$nuxt.$emit( 'concorso:voto', { libro: this.voto, utente: this.tweet.user.account })
			}
			return isvoto
		},
		onConcorsoLibro ({ libro }) {
			this.libro = libro
		},
		onConcorsoVoto ({ libro, utente }) {
			this.$nextTick(() => {
				this.libro = libro
				if ( !this.libri[libro] ) {
					this.libri[libro] = 0
				}
				if ( !this.voti[utente] ) {
					this.voti[utente] = [libro]
					this.libri[libro] += 1
				} else	if ( this.voti[utente].length < 10 && !this.voti[utente].includes(libro) ) {
					this.voti[utente].push(libro)
					this.libri[libro] += 1
				}
				console.log(this.voti)
				console.log(this.libri)
			})
		},
	},
	computed: {
		checkConcorso () {
			return this.tweet.tags.some(this.checkC)
		},
		checkScrittore () {
			return this.tweet.tags.some(this.checkS)
		},
		checkVoto () {
			return this.tweet.tags.some(this.checkV)
		},
	},
	mounted() {
		this.$nuxt.$on('concorso:libro', this.onConcorsoLibro)
		this.$nuxt.$on('concorso:voto', this.onConcorsoVoto)
	},
}
