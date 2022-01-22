<template>
	<div>
		<div
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
				Trivia Quiz
			</span>
			<div class="custom_text pl-3">
				Risposte
				<v-icon
					large
					color="#DEA600"
				>
					mdi-account-arrow-right
				</v-icon>
				<span class="c_a">{{ num_r }}</span>
			</div>
		</div>
		<div
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
					mdi-check
				</v-icon>
			</v-btn>
			<span class="custom_text">
				Punteggio di questa risposta: {{ num_p }}
			</span>
			<div>
				<br>
			</div>
		</div>
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
