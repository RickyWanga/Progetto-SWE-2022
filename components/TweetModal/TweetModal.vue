<template>
	<v-dialog
		v-model="on"
		transition="dialog-top-transition"
		max-width="600"
	>
		<v-card>
			<v-card-actions class="justify-end">
				<v-icon
					style="position:absolute; top:10px; z-index: 1;"
					large
					@click="$nuxt.$emit( 'tweet-modal-off' )"
				>
					mdi-alpha-x
				</v-icon>
			</v-card-actions>
			<v-card-text>
				<slot />
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script src="./TweetModal.js"></script>
