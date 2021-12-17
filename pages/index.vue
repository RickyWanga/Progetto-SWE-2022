<template>
	<v-container fill-height>
		<v-row style="height:100%">
			<v-col cols="4">
				<div style="height:70%">
					<Tweets :loading="tweets_loading" :tweets="tweets">
						<Tweet
							v-for="tweetItem in tweets"
							:key="tweetItem.id"
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
						<Analytics :tweets="tweets" :sentiment="sentiment" :loading="sentiments.loading">
							<Diagram v-if="hasDateDiagram" :label-value="dates" />
						</Analytics>
					</div>
				</div>
			</v-col>
			<v-col v-if="show_media" :cols="(show_map || show_tagcloud) ? 4 : 8">
				<div style="height:100%">
					<Media :media="images" :show="show_map || show_tagcloud" />
				</div>
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
		<v-dialog v-model="alert.show" transition="dialog-top-transition" width="auto">
			<v-alert class="ma-0" :type="alert.type">{{ alert.message }}</v-alert>
		</v-dialog>
		<TweetModal
			v-if="tweet_modal.show"
		>
			<v-row style="border:5px solid lightblue; background:lightblue; border-radius:15px;">
				<Tweet
					style="background:lightblue;"
					:tweet="tweet_modal.tweet"
				/>
			</v-row>
			<v-row>
				<TweetReplies
					:tweet="tweet_modal.tweet"
					:replies="replies"
				/>
			</v-row>
		</TweetModal>
	</v-container>
</template>

<script src="./index.js"></script>
