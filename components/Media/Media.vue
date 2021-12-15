<template>
	<v-container fill-height class="media-container">
		<div class="media-list">
			<v-img
				v-for="( m, i ) in media"
				:key="`${ m.key }${ i }`"
				:alt="m.alt"
				:src="m.url"
				:lazy-src="m.url"
				aspect-ratio="1"
				class="media-item"
				:width="imgWidth "
			/>
		</div>
	</v-container>
</template>

<script src="./Media.js"></script>
<style src="./Media.css"></style>
