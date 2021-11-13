<template>
	<div class="tweets">
		<v-container class="my-3">
			<v-row>
				<v-col>
					<v-skeleton-loader
						:loading="loading"
						:transition="transition"
						type="card-heading"
					>
						<v-card
							class="pa-4 ma-6"
						>
							<v-text-field
								placeholder="Search Tweets"
								prepend-inner-icon="mdi-magnify"
								class="expanding-search mt-1 rounded-pill"
								outlined
								dense
								hide-details
								background-color="#121212"
							></v-text-field>
						</v-card>
					</v-skeleton-loader>
					<v-card
						color="bg light"
						class="pa-4 opened ma-6"

					>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script src="./tweetcolumn.js"></script>
<style src="./tweetcolumn.css"></style>
