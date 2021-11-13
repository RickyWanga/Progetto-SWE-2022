<template>
	<div class="CloudTag">
		<v-col>
			<v-skeleton-loader
				:loading="loading"
				:transition="transition"
				type="image"
			>
				<v-card
					color="bg light"
					class="pa-4 ma-6"
					min-height="350">
				</v-card>
			</v-skeleton-loader>
		</v-col>
	</div>
</template

<script src="./CloudTag.js"></script>
<style src="./CloudTag.css"></style>
