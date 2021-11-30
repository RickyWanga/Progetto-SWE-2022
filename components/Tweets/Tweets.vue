<template>
	<v-container class="d-flex flex-column" style="height:100%">
		<v-row class="flex-grow-0">
			<v-col>
				<v-form
					v-model="valid"
					class="tweets-form"
					@submit.prevent="submit"
				>
					<v-row>
						<v-col class="flex-grow-1">
							<v-text-field
								v-model="query"
								class="expanding-search rounded-pill"
								clearable
								dense
								outlined
								persistent-placeholder
								placeholder="Search Tweets"
								required
								:rules="queryRules"
								@click:clear="$nuxt.$emit( 'query-cleared' )"
							/>
						</v-col>
						<v-col class="flex-grow-0">
							<v-btn
								color="primary"
								elevation="3"
								icon
								type="submit"
								x-large
								:disabled="!valid"
								:loading="loading"
							>
								<v-icon>
									mdi-magnify
								</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
		<v-row class="flex-grow-1">
			<v-col
				:class="[
					'tweets-container',
					! tweets.length ? 'tweets-container--empty' : '',
				]"
			>
				<v-list
					class="tweets-list"
					tag="ul"
				>
					<v-list-item
						v-for="tweet in tweets"
						:key="tweet.id"
						class="pl-0"
						tag="li"
					>
						<v-list-item-avatar
							class="tweet-avatar"
						>
							<v-img :src="tweet.user.picture" />
						</v-list-item-avatar>
						<v-list-item-content>
							<p class="tweet-title">
								<strong>{{ tweet.user.name }}</strong>
								<span class="text--disabled font-weight-bold">@{{ tweet.user.account }}</span>
							</p>
							<p class="tweet-text mb-0">
								<span class="font-weight-regular">
									{{ tweet.text }}
								</span>
								<span class="tweet-badges">
									<v-icon
										v-if="tweet.geo.target"
										color="primary"
										small
										:title="tweet.geo.tooltip"
									>
										mdi-map-marker
									</v-icon>
								</span>
							</p>
							<v-progress-circular
								v-if="tweet.sentiment"
								rotate="-300"
								size="50"
								style="position:absolute;top:7px;left:-5px"
								width="4"
								:color="( tweet.sentiment.value >= 0 ) ? 'teal' : 'pink'"
								:value="tweet.sentiment.score"
							/>
							<v-badge
								v-if="tweet.sentiment"
								style="position:absolute;top:64px;left:30px"
								:color="( tweet.sentiment.value === 0 ) ? 'grey lighten-2' : (( tweet.sentiment.value > 0 ) ? 'teal' : 'pink')"
								:content="tweet.sentiment.score.toString()"
								:title="`Sentiment analysis: ${ tweet.sentiment.value }`"
							/>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script src="./Tweets.js"></script>
<style src="./Tweets.css"></style>
