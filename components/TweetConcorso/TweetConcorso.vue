<template>
	<div
		class="mt-2 mb-4"
	>
		<div
			v-if="isConcorso"
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
				Concorso letterario
			</span>
			<div
				v-for="( libro, i ) in libri"
				:key="`${ libro.id }_${ i }`"
				@click="$nuxt.$emit( 'open-modal', libro.id )"
			>
				<v-progress-linear
					class="ma-2"
					color="#1D9BF0"
					height="25"
					:value="( libro.voti * 100 ) / maxVoto"
				>
					<span class="custom_text3">
						{{ libro.label }}: {{ libro.voti }} vot{{ libro.voti === 1 ? "o" : "i" }}
					</span>
				</v-progress-linear>
			</div>
		</div>
		<div
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
				Libro votato da {{ libro.voti }} utent{{ libro.voti === 1 ? "e" : "i" }}
			</span>
		</div>
		<div
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
				L'utente ha votato un libro iscritto al concorso
			</span>
		</div>
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
