<template>
	<v-dialog
		v-model="on"
		transition="dialog-top-transition"
		max-width="600"
	>
		<v-card>
			<v-card-text>
				<slot />
			</v-card-text>
			<v-card-actions class="justify-end">
				<v-btn
					text
					@click="$nuxt.$emit( 'tweet-modal-off' )"
				>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script src="./TweetModal.js"></script>
