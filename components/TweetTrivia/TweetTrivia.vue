<template>
	<div>
		<p
			v-if="isDomanda"
			style="padding-top: 5px;"
		>
			<v-btn
				class="ma-2 pa-2"
				color="amber"
				fab
			>
				<v-icon
					color="white"
					large
				>
					mdi-help
				</v-icon>
			</v-btn>
			<span class="custom_text">
				Questo utente ha fatto una domanda
				Il numero di risposte e': {{ num_r }}
			</span>
		</p>
		<p
			v-else-if="isRisposta"
			style="padding-top: 5px;"
		>
			<v-btn
				class="ma-2 pa-2"
				color="amber"
				fab
			>
				<v-icon
					color="white"
					large
				>
					mdi-reply
				</v-icon>
			</v-btn>
			<span class="custom_text">
				Questa è una risposta
			</span>
			<v-icon
				color="black"
				large
			>
				mdi-arrow-up
			</v-icon>
			{{ num_p }}
		</p>
		<v-btn
			v-if="isRisposta"
			style="padding-top: 5px"
			color="amber"
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
				Vai alla domanda
			</span>
		</v-btn>
	</div>
</template>

<script src="./TweetTrivia.js"></script>
<style src="./TweetTrivia.css"></style>
