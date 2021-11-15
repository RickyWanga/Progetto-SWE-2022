<template>
	<v-container fill-height>
		<l-map :zoom="zoom" :center="center">
			<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
		</l-map>
	</v-container>
</template>

<script src="./Map.js"></script>
<style src="./Map.css"></style>
