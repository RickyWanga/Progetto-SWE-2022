<template>
	<div>
		<div
			v-for="( reply, index ) in replies"
			:key="index"
		>
			<Tweet
				v-if="reply !== tweet && reply.reference.id === tweet.id"
				:tweet="reply"
				isReplyModal="true"
			/>
		</div>
	</div>
</template>

<script src="./TweetReplies.js"></script>
