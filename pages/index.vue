<template>
	<v-container fill-height>
		<v-row style="height:100%">
			<v-col cols="4">
				<div style="height:70%">
					<Tweets :loading="loading_tweets" :tweets="tweets">
						<Tweet
							v-for="( tweetItem, index ) in tweets"
							:key="index"
							:tweet="tweetItem"
							class="pl-0"
							tag="li"
						>
							<TweetSentiment :sentiment="tweetItem.sentiment" />
						</Tweet>
					</Tweets>
				</div>
				<div style="height:30%">
					<div class="pt-4" style="height:100%">
						<Analytics :tweets="tweets" :sentiment="sentiment" :loading="loading_sentiments">
							<Diagram v-if="hasDateDiagram" :label-value="dates" />
						</Analytics>
					</div>
				</div>
			</v-col>
			<v-col v-if="show_media" :cols="(show_map || show_tagcloud) ? 4 : 8">
				<Media />
			</v-col>
			<v-col v-if="show_map || show_tagcloud" :cols="(show_media) ? 4 : 8">
				<div
					v-if="show_map"
					:style="'height:' + ( show_tagcloud ? 70 : 100 ) + '%'"
				>
					<Map :geo="geo" />
				</div>
				<div
					v-if="show_tagcloud"
					:class="(show_map ? 'pt-6' : '')"
					:style="'height:' + ( show_map ? 30 : 100 ) + '%'"
				>
					<TagCloud :tags="tags" />
				</div>
			</v-col>
		</v-row>
		<v-dialog v-model="alert.show" transition="dialog-top-transition">
			<v-alert class="ma-0" :type="alert.type">{{ alert.message }}</v-alert>
		</v-dialog>
		<TweetModal
			v-if="tweet_modal_show"
		>
			<v-row style="border:5px solid lightblue; background:lightblue; border-radius:15px;">
				<Tweet
					style="background:lightblue;"
					:tweet="tweet_modal_tweet"
				/>
			</v-row>
			<v-row>
				<TweetReplies
					:tweets="tweets"
					:tweet="tweet_modal_tweet"
				/>
			</v-row>
		</TweetModal>
	</v-container>
</template>

<script src="./index.js"></script>
