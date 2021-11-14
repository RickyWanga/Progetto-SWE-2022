<template>
	<v-container class="d-flex flex-column" style="height:100%">
		<v-row class="flex-grow-0">
			<v-col>
				<v-text-field
					placeholder="Search Tweets"
					prepend-inner-icon="mdi-magnify"
					class="expanding-search mt-1 rounded-pill"
					outlined
					dense
					hide-details
					background-color="#121212"
				/>
			</v-col>
		</v-row>
		<v-row class="flex-grow-1 yellow">
			<v-col />
		</v-row>
	</v-container>
</template>

<script src="./Tweets.js"></script>
<style src="./Tweets.css"></style>
