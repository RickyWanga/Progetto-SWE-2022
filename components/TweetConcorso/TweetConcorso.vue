<template>
	<div>
		<p
			v-if="isConcorso"
			style="padding-top: 5px;"
		>
			<v-btn
				class="ma-2 pa-2"
				color="#1D9BF0"
				fab
			>
				<v-icon
					color="white"
					large
				>
					mdi-trophy
				</v-icon>
			</v-btn>
			<span class="custom_text">
				Questo utente ha dato inizio al concorso
			</span>
			<span
				v-for="( voto, i ) in getOrdinato"
				:key="`${ voto.libro_id }_${ i }`"
			>
				<v-progress-linear
					class="ma-2"
					color="#1D9BF0"
					height="25"
					:value="( voto.libro_voti * 100 ) / maxVoto"
				>
					<span class="custom_text3">
						{{ voto.libro_id }} {{ voto.libro_voti }}
					</span>
				</v-progress-linear>
			</span>
		</p>
		<p
			v-else-if="isLibro"
			style="padding-top: 5px;"
		>
			<v-btn
				class="ma-2 pa-2"
				color="#1D9BF0"
				fab
			>
				<v-icon
					color="white"
					large
				>
					mdi-book
				</v-icon>
			</v-btn>
			<span class="custom_text">
				Questo è un libro da votare {{ voti.libro[ tweet.id ] }}
			</span>
		</p>
		<p
			v-else-if="isVoto"
			style="padding-top: 5px;"
		>
			<v-btn
				class="ma-2 pa-2"
				color="#1D9BF0"
				fab
			>
				<v-icon
					color="white"
					large
				>
					mdi-account-check
				</v-icon>
			</v-btn>
			<span class="custom_text">
				L'utente ha votato
			</span>
		</p>
		<v-btn
			v-if="isLibro"
			style="padding-top: 5px"
			color="#1D9BF0"
			@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
		>
			<span class="custom_text2">
				<v-icon
					color="white"
					medium
					class="pb-1"
				>
					mdi-arrow-left
				</v-icon>
				Vai al concorso
			</span>
		</v-btn>
		<v-btn
			v-else-if="isVoto"
			style="padding-top: 5px"
			color="#1D9BF0"
			@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
		>
			<span class="custom_text2">
				<v-icon
					color="white"
					medium
					class="pb-1"
				>
					mdi-arrow-left
				</v-icon>
				Vai al libro votato
			</span>
		</v-btn>
	</div>
</template>

<script src="./TweetConcorso.js"></script>
<style src="./TweetConcorso.css"></style>
