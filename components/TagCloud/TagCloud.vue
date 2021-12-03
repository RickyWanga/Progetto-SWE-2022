<template>
	<v-container fill-height style="background-color:#eee">
		<vue-word-cloud
			class="tag-cloud"
			:color="color"
			:font-family="fontFamily"
			:font-size-ratio="fontSizeRatio"
			:rotation="rotation"
			:words="words"
		/>
	</v-container>
</template>

<script src="./TagCloud.js"></script>
<style src="./TagCloud.css"></style>
