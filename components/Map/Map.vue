<template>
	<v-container fill-height class="pa-0">
		<client-only>
			<l-map v-if="show" ref="map" :zoom="zoom" :center="center">
				<l-tile-layer :url="url" :attribution="attribution" />
			</l-map>
		</client-only>
	</v-container>
</template>

<script src="./Map.js"></script>
<style src="./Map.css"></style>
