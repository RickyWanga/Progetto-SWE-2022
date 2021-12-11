<template>
	<div>
		<div
			v-for="( reply, index ) in tweets"
			:key="index"
		>
			<Tweet
				v-if="tweet !== reply && reply.reference.id === tweet.id"
				:tweet="reply"
			/>
		</div>
	</div>
</template>

<script src="./TweetReplies.js"></script>
