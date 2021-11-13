<template>
	<div class="Map">
		<v-col>
			<v-skeleton-loader
				:loading="loading"
				:transition="transition"
				type="card-heading, image"
			>
				<v-card
					color="bg light"
					class="pa-4 ma-6"
				>
					<v-btn @click="isShow=!isShow">click Me</v-btn>
					<div v-show="isShow">
						<l-map style="height:300px" :zoom="zoom" :center="center">
							<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
						</l-map>
					</div>
				</v-card>
			</v-skeleton-loader>
		</v-col>
	</div>
</template>

<script src="./Map.js"></script>
<style src="./Map.css"></style>
