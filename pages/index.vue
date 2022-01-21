<template>
	<v-container fill-height>
		<v-row style="height:100%">
			<v-col cols="4">
				<div style="height:70%">
					<Tweets :loading="tweets_loading" :tweets="tweets">
						<li
							v-for="( tweetItem, i ) in tweets"
							:key="`${ tweetItem.id }_${ i }`"
							style="position:relative"
						>
							<Tweet
								:tweet="tweetItem"
								class="pl-0"
							/>
							<TweetSentiment
								:sentiment="tweetItem.sentiment"
							/>
						</li>
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
			<v-col v-if="layout.show_media" :cols="(layout.show_map || layout.show_tagcloud) ? 4 : 8">
				<div style="height:100%">
					<Media :media="images" :show="layout.show_map || layout.show_tagcloud" />
				</div>
			</v-col>
			<v-col v-if="layout.show_map || layout.show_tagcloud" :cols="(layout.show_media) ? 4 : 8">
				<div
					v-if="layout.show_map"
					:style="'height:' + ( layout.show_tagcloud ? 70 : 100 ) + '%'"
				>
					<Map :geo="geo" />
				</div>
				<div
					v-if="layout.show_tagcloud"
					:class="(layout.show_map ? 'pt-6' : '')"
					:style="'height:' + ( layout.show_map ? 30 : 100 ) + '%'"
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
					is-modal="true"
				/>
			</v-row>
			<v-row>
				<TweetConcorso
					:tweet="tweet_modal.tweet"
					:replies="tweet_modal.replies"
				/>
			</v-row>
			<v-row>
				<TweetTrivia
					:tweet="tweet_modal.tweet"
					:replies="tweet_modal.replies"
				/>
			</v-row>
			<v-row v-if="tweet_modal.tweet.media.images[0]">
				<v-carousel
					:show-arrows="tweet_modal.tweet.media.images.length > 1"
					hide-delimiters
				>
					<v-carousel-item
						v-for="(item,i) in tweet_modal.tweet.media.images"
						:key="i"
						:src="item.url"
					/>
				</v-carousel>
			</v-row>
			<v-row>
				<TweetReplies
					:tweet="tweet_modal.tweet"
					:replies="tweet_modal.replies"
				/>
			</v-row>
		</TweetModal>
	</v-container>
</template>

<script src="./index.js"></script>
