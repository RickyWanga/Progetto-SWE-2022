<template>
	<v-list-item class="tweets-listitem">
		<v-list-item-avatar
			class="tweets-listitem-avatar"
		>
			<v-img :src="tweet.user.picture" />
		</v-list-item-avatar>
		<v-list-item-content>
			<p class="tweets-listitem-title">
				<strong>{{ tweet.user.name }}</strong>
				<span class="text--disabled font-weight-bold">@{{ tweet.user.account }}</span>
			</p>
			<p class="tweets-listitem-text mb-0">
				<span class="font-weight-regular">
					{{ tweet.text }}
				</span>
				<span class="tweets-listitem-badges">
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
			<slot />
		</v-list-item-content>
	</v-list-item>
</template>

<script src="./ListItem.js"></script>
<style src="./ListItem.css"></style>
