<template>
	<v-list-item
		class="tweets-listitem"
		@click="$nuxt.$emit( 'open-modal', tweet )"
	>
		<v-list-item-avatar
			class="tweets-listitem-avatar"
		>
			<v-img :src="tweet.user.picture" />
		</v-list-item-avatar>
		<v-list-item-content>
			<p class="tweets-listitem-title">
				<strong>{{ tweet.user.name }}</strong>
				<span
					class="text--disabled font-weight-bold"
					@click="$nuxt.$emit( 'query', { query: `from:${ tweet.user.account }` })"
				>
					@{{ tweet.user.account }}
				</span>
			</p>
			<p class="tweets-listitem-text mb-0">
				<span class="font-weight-regular">
					<template
						v-for="(word, i) in tweet.words"
					>
						<span
							v-if="'#' === word[ 0 ]"
							:key="i"
							class="font-weight-bold primary--text text--lighten-1 tweet-tag"
							@click="$nuxt.$emit( 'query', { query: `${ word }` })"
						>
							{{ word }}
						</span>
						<template
							v-else
						>
							{{ word }}
						</template>
					</template>
				</span>
				<span class="tweets-listitem-badges">
					<v-icon
						v-if="!!( tweet.geo && tweet.geo.target )"
						color="primary"
						small
						:title="tweet.geo.tooltip"
					>
						mdi-map-marker
					</v-icon>
					<span
						v-if="tweet.public_metrics.reply_count"
						style="white-space:nowrap"
					>
						<v-icon
							color="primary"
							small
						>
							mdi-message-reply-outline
						</v-icon>
						<small class="tweet-reply">
							{{ tweet.public_metrics.reply_count }}
						</small>
					</span>
					<v-icon
						v-if="!!tweet.concorso.is_concorso || !!tweet.concorso.is_libro || !!tweet.concorso.is_voto"
						color="primary"
						small
					>
						mdi-trophy
					</v-icon>
				</span>
			</p>
			<slot />
		</v-list-item-content>
	</v-list-item>
</template>

<script src="./Tweet.js"></script>
<style src="./Tweet.css"></style>
