<template>
	<v-dialog
		v-model="on"
		transition="dialog-top-transition"
		max-width="600"
	>
		<v-card
			style="background:white; padding-top:4px"
		>
			<v-card-actions class="justify-end">
				<v-icon
					style="position:absolute; top:12px; right:20px; z-index: 1;"
					@click="$nuxt.$emit( 'tweet-modal-off' )"
				>
					mdi-close
				</v-icon>
			</v-card-actions>
			<v-card-text>
				<slot />
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script src="./TweetModal.js"></script>
