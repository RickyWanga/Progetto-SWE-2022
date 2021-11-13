<template>
	<v-row>
		<v-layout row wrap>
			<v-flex xs12 sm12 md12 lg4 xl4>
				<tweetcolumn />
			</v-flex>
			<v-flex xs12 sm12 md12 lg4 xl4>
				<images />
			</v-flex>
			<v-flex xs12 sm12 md12 lg4 xl4>
				<v-col>
					<Map />
					<CloudTag />
				</v-col>
			</v-flex>
		</v-layout>
	</v-row>
</template>
