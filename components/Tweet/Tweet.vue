<template>
	<v-dialog
		transition="dialog-top-transition"
		max-width="600"
	>
		<template #activator="{ on, attrs }">
			<v-card-actions
				v-bind="attrs"
				v-on="on"
			>
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
			</v-card-actions>
		</template>
		<template #default="dialog">
			<v-card>
				<v-card-text>
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
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
						text
						@click="dialog.value = false"
					>
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script src="./Tweet.js"></script>
<style src="./Tweet.css"></style>
