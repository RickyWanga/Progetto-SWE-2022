<template>
	<div>
		<p
			v-if="isConcorso"
			style="padding-top: 5px;"
		>
			<v-icon
				color="black"
				small
			>
				mdi-trophy
			</v-icon>
			Questo utente ha dato inizio al concorso
			<ul
				v-for="( libro_id, i ) in Object.keys( voti.libro )"
				:key="`${ libro_id }_${ i }`"
			>
				<li>
					{{ libro_id }} {{ voti.libro[ libro_id ] }}
				</li>
			</ul>
		</p>
		<p
			v-else-if="isLibro"
			style="padding-top: 5px;"
		>
			<v-icon
				color="black"
				small
			>
				mdi-book
			</v-icon>
			Questo è un libro da votare {{ voti.libro[ tweet.id ] }}
		</p>
		<p
			v-else-if="isVoto"
			style="padding-top: 5px;"
		>
			<v-icon
				color="black"
				small
			>
				mdi-ballot
			</v-icon>
			L'utente ha votato
		</p>
		<button
			v-if="isLibro"
			style="text-decoration: underline; padding-top: 5px"
			@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
		>
			Vai al concorso
		</button>
		<button
			v-else-if="isVoto"
			style="text-decoration: underline; padding-top: 5px"
			@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
		>
			Vai al libro votato
		</button>
	</div>
</template>

<script src="./TweetConcorso.js"></script>
