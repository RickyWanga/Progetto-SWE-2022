<template>
	<div class="images">
		<v-container class="my-0">
			<v-col>
				<v-skeleton-loader
					:loading="loading"
					:transition="transition"
					type="image"
				>
					<v-card
						color="bg light"
						class="pa-4 ma-6"
						min-height="650">
					</v-card>
				</v-skeleton-loader>
			</v-col>
		</v-container>
	</div>
</template>

<script src="./Images.js"></script>
<style src="./Images.css"></style>
