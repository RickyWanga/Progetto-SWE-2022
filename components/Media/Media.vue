<template>
	<v-container fill-height class="media-container">
		<div class="media-list">
			<v-img
				v-for="( m, i ) in media"
				:key="`${ m.key }${ i }`"
				aspect-ratio="1"
				class="media-item"
				width="50%"
				:src="m.url"
			/>
		</div>
	</v-container>
</template>

<script src="./Media.js"></script>
<style src="./Media.css"></style>
