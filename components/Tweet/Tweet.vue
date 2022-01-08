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
					<v-icon
						v-if="tweet.public_metrics.reply_count"
						color="primary"
						small
					>
						mdi-message-reply-outline
					</v-icon>
					<small v-if="tweet.public_metrics.reply_count" class="tweet-reply">
						{{ tweet.public_metrics.reply_count }}
					</small>

					<v-icon
						v-if="checkConcorso"
						color="primary"
						small
					>
						mdi-human-male-board-poll
					</v-icon>
					<v-icon
						v-if="checkScrittore"
						color="primary"
						small
					>
						mdi-book-open-variant
					</v-icon>
					<v-icon
						v-if="checkVoto"
						color="primary"
						small
					>
						mdi-vote-outline
					</v-icon>
				</span>
			</p>
			<slot />
			<p
				v-if="isModal && checkConcorso"
				style="padding-top: 5px;"
			>
				<v-icon
					color="black"
					small
				>
					mdi-trophy
				</v-icon>
				Questo utente ha dato inizio ad un concorso
			</p>
			<p
				v-if="( isReplyModal || isModal ) && checkScrittore"
				style="padding-top: 5px;"
			>
				<v-icon
					color="black"
					small
				>
					mdi-book
				</v-icon>
				Questo è un libro da poter votare.
			</p>
			<p
				v-if="( isReplyModal || isModal ) && checkVoto"
				style="padding-top: 5px;"
			>
				<v-icon
					color="black"
					small
				>
					mdi-ballot
				</v-icon>
				L'utente ha votato il libro : {{ libro }}
			</p>
			<p
				v-if="isModal && checkScrittore"
				style="text-decoration: underline; padding-top: 5px"
				@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
			>
				Vai al concorso
			</p>
			<p
				v-if="isModal && checkVoto"
				style="text-decoration: underline; padding-top: 5px"
				@click.stop="$nuxt.$emit( 'open-modal', tweet.reference.id )"
			>
				Vai al libro votato
			</p>
		</v-list-item-content>
	</v-list-item>
</template>

<script src="./Tweet.js"></script>
<style src="./Tweet.css"></style>
