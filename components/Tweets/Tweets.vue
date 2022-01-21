<template>
	<v-container class="d-flex flex-column" style="height:100%">
		<v-row class="flex-grow-0">
			<v-col>
				<TweetsSearchForm
					:loading="loading"
					:search-button-message="searchButtonMessage"
				/>
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
					<slot />
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script src="./Tweets.js" />
<style src="./Tweets.css" />
