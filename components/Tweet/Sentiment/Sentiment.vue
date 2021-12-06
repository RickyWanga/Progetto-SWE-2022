<template>
	<div class="tweetlist-item-sentiment">
		<v-progress-circular
			v-if="!!sentiment"
			rotate="-300"
			size="50"
			width="4"
			:color="color"
			:value="sentiment.score"
		/>
		<v-badge
			v-if="!!sentiment"
			:color="color"
			:content="sentiment.score"
			:title="`Sentiment analysis: ${ sentiment.value }`"
		/>
	</div>
</template>

<script src="./Sentiment.js"></script>
<style src="./Sentiment.css"></style>
