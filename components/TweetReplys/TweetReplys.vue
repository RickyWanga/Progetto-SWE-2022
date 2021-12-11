<template>
	<div>
		<div
			v-for="( tweetItem, index ) in tweets"
			:key="index"
		>
			<Tweet
				v-if="tweetItem.reference.id == tweet_modal_tweet.id && tweet_modal_tweet !== tweetItem"
				:tweet="tweetItem"
			/>
		</div>
	</div>
</template>

<script src="./TweetReplys.js"></script>
