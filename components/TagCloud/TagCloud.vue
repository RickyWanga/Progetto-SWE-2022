<template>
	<v-container fill-height>
		<vue-word-cloud
			class="tag-cloud"
			:color="color"
			:font-family="fontFamily"
			:rotation="rotation"
			:words="words"
		/>
	</v-container>
</template>

<script src="./TagCloud.js"></script>
<style src="./TagCloud.css"></style>
