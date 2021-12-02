<template>
	<v-container
		fill-height
	>
		<v-row
			style="height:100%"
		>
			<v-col
				cols="4"
			>
				<div
					style="height:70%"
				>
					<Tweets :loading="loading_tweets" :tweets="tweets" />
				</div>
				<div
					style="height:30%"
				>
					<div
						class="pt-4"
						style="height:100%"
					>
						<v-card
							class="pa-2"
							height="100%"
							style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 1fr; position: relative"
						>
							<div
								class="pa-4"
								style="grid-column: 1 / span 2; grid-row: 1 / span 1; z-index: 1"
							>
								<div
									class="text-caption grey--text text-uppercase"
								>
									Counts
								</div>
								<div>
									<span
										class="text-h3 font-weight-black"
										v-text="tweets.length || '—'"
									/>
									<strong v-if="tweets.length">
										Tweet<span v-if="tweets.length > 1">s</span>
									</strong>
								</div>
							</div>
							<div
								class="text-caption grey--text text-uppercase text-right mt-2 mr-2"
								style="grid-column: 3 / span 1; grid-row: 1 / span 1"
							>
								Sentiment Analysis
							</div>
							<div
								style="grid-column: 4 / span 1; grid-row: 1 / span 1"
							>
								<div
									class="sentiment-progress mt-2"
									:title="`Positive: ${ sentiment_positive_percent }% Neutral: ${ 100 - sentiment_positive_percent - sentiment_negative_percent }% Negative: ${ sentiment_negative_percent }%`"
								>
									<v-progress-circular
										color="teal"
										rotate="90"
										size="50"
										width="10"
										:value="sentiment_positive_percent"
									/>
									<v-progress-circular
										color="pink"
										rotate="-90"
										size="50"
										width="10"
										:value="sentiment_negative_percent"
									/>
								</div>
							</div>
							<div
								style="height:60%;width:100%;position:absolute;bottom:0;left:0;z-index:0"
							>
								<Diagram v-if="hasDiagram" :label-value="dates" />
							</div>
						</v-card>
					</div>
				</div>
			</v-col>
			<v-col
				v-if="show_media"
				:cols="(show_map || show_tagcloud) ? 4 : 8"
			>
				<Media />
			</v-col>
			<v-col
				v-if="show_map || show_tagcloud"
				:cols="(show_media) ? 4 : 8"
			>
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
		<v-dialog
			v-model="alert.show"
			transition="dialog-top-transition"
		>
			<v-alert class="ma-0" :type="alert.type">{{ alert.message }}</v-alert>
		</v-dialog>
	</v-container>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>
