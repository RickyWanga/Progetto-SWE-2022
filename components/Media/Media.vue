<template>
	<v-container fill-height class="media-container">
		<div class="media-list">
			<v-img
				v-for="( m, i ) in media"
				:key="`${ m.key }${ i }`"
				:alt="m.alt"
				:lazy-src="i <= 12 ? m.url : null"
				:src="m.url"
				:transition="false"
				:width="imgWidth "
				aspect-ratio="1"
				class="media-item"
				@click="$nuxt.$emit( 'open-modal', m.target )"
			/>
		</div>
	</v-container>
</template>

<script src="./Media.js"></script>
<style src="./Media.css"></style>
