<template>
	<v-container class="d-flex flex-column" style="height:100%">
		<v-row class="flex-grow-0">
			<v-col>
				<v-form
					v-model="valid"
					@submit.prevent="submit"
				>
					<v-row>
						<v-col class="flex-grow-1">
							<v-text-field
								v-model="query"
								placeholder="Search Tweets"
								class="expanding-search rounded-pill"
								clearable
								outlined
								dense
								required
								:rules="queryRules"
							/>
						</v-col>
						<v-col class="flex-grow-0">
							<v-btn
								ref="submit"
								color="primary"
								icon
								x-large
								elevation="3"
								:disabled="!valid"
								:loading="loading"
								@click="submit"
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
							class="tweet-avatar pt-1"
						>
							<v-img :src="tweet.user.picture" />
						</v-list-item-avatar>
						<v-list-item-content>
							<p>
								<strong>{{ tweet.user.name }}</strong>
								<em>@{{ tweet.user.account }}</em>
							</p>
							<p>
								{{ tweet.text }}
								<span class="badges">
									<v-icon
										v-if="tweet.geo"
										color="primary"
										:title="tweet.geo.place.name + ' - ' + tweet.geo.place.country"
									>
										mdi-map-marker-circle
									</v-icon>
								</span>
							</p>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script src="./Tweets.js"></script>
<style src="./Tweets.css"></style>
