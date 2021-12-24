<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			class="pt-16"
			disable-route-watcher
			fixed
			:clipped="clipped"
			:mini-variant="miniVariant"
		>
			<v-list>
				<v-list-item>
					<v-switch
						v-model="toggle_media"
						color="blue"
						flat
						hide-details
						inset
						label="Media"
						:disabled="!( toggle_map || toggle_tagcloud )"
						@click.stop="$nuxt.$emit( 'toggle-media', toggle_media )"
					/>
				</v-list-item>
				<v-list-item>
					<v-switch
						v-model="toggle_map"
						color="red"
						flat
						hide-details
						inset
						label="Mappa"
						:disabled="!(toggle_media || toggle_tagcloud)"
						@click.stop="$nuxt.$emit( 'toggle-map', toggle_map )"
					/>
				</v-list-item>
				<v-list-item>
					<v-switch
						v-model="toggle_tagcloud"
						color="green"
						flat
						hide-details
						inset
						label="Tag Cloud"
						:disabled="!( toggle_media || toggle_map )"
						@click.stop="$nuxt.$emit( 'toggle-tagcloud', toggle_tagcloud )"
					/>
				</v-list-item>
			</v-list>
			<v-list>
				<v-list-item>
					<v-container>
						<v-row>
							<h3>Impostazioni</h3>
						</v-row>
					</v-container>
				</v-list-item>
				<v-list-item>
					<v-container>
						<v-row>
							Numero massimo di Tweet da mostrare:
						</v-row>
						<v-row>
							<v-text-field
								v-model.number="max_results"
								:rules="maxResultsRules"
								class="mt-0 pt-0"
								min="10"
								required
								type="number"
								@change="$nuxt.$emit( 'max_results:change', $event )"
							/>
						</v-row>
					</v-container>
				</v-list-item>
			</v-list>
			<template #append>
				<v-list>
					<v-list-item
						v-for="(item, i) in navigation_items"
						:key="i"
						:href="item.to"
						target="_blank"
					>
						<v-list-item-action v-if="item.icon">
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title v-text="item.title" />
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</template>
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="clipped"
			app
			color="primary white--text"
			fixed
		>
			<v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
			<nuxt-link to="/" style="text-decoration:none; color:inherit;">
				<v-toolbar-title v-text="title" />
			</nuxt-link>
			<v-spacer />
			<v-switch
				v-model="toggle_stream"
				class="v-input--reverse"
				color="yellow"
				dark
				flat
				hide-details
				inset
				:disabled="button_stream_disabled"
				@click.stop="$nuxt.$emit( 'toggle-stream', toggle_stream )"
			>
				<template #label>
					Flusso di Tweet in tempo reale
				</template>
			</v-switch>
		</v-app-bar>
		<v-main>
			<Nuxt />
		</v-main>
		<v-footer
			:absolute="!fixed"
			app
		>
			<span><span style="display:inline-block;transform-origin:50% 45%;transform:rotate(180deg)">©</span>&nbsp;{{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
const MAX_RESULTS = 500
const MIN_RESULTS = 10
const LABEL_REQUIRED = "This field is required"
const LABEL_FIELD_MIN = "The field value must be greater than " + MIN_RESULTS
export default {
	data () {
		return {
			button_stream_disabled: true,
			clipped: true,
			drawer: false,
			fixed: true,
			miniVariant: false,
			max_results: MAX_RESULTS,
			maxResultsRules: [
				v => !!v || LABEL_REQUIRED,
				v => ( v && v >= MIN_RESULTS ) || LABEL_FIELD_MIN,
			],
			navigation_items: [
				{
					title: 'TEAM 13',
				},
				{
					icon: 'mdi-application-edit-outline',
					title: 'Wireframe',
					to: 'https://wireframe.cc/WSmfNz'
				},
				{
					icon: 'mdi-folder-table',
					title: 'Taiga',
					to: 'https://aminsep.disi.unibo.it/project/admin-progetto-2021-team-13'
				},
				{
					icon: 'mdi-gitlab',
					title: 'Gitlab',
					to: 'https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project'
				},
			],
			title: 'TED - Twitter Extended Dashboard',
			toggle_map: true,
			toggle_media: true,
			toggle_stream: false,
			toggle_tagcloud: true,
		}
	},
	mounted() {
		this.$nuxt.$emit( "max_results:change", this.max_results )
		this.$nuxt.$on( "query", this.onQuery )
		this.$nuxt.$on( "max_results:change", this.onMaxResultChange )
		this.$nuxt.$on( "stream-stop", this.onStreamStop )
	},
	methods: {
		checkMaxResultRange( val ) {
			if ( val < MIN_RESULTS ) {
				this.max_results = MIN_RESULTS
				this.$nuxt.$emit( "max_results:change", MIN_RESULTS )
			}
		},
		onMaxResultChange( val ) {
			this.checkMaxResultRange( val )
		},
		onQuery() {
			this.button_stream_disabled = false
		},
		onStreamStop({ disabled }) {
			this.toggle_stream = false
			this.button_stream_disabled = disabled
		},
	}
}
</script>

<style>
.v-input--reverse .v-input__slot {
	flex-direction: row-reverse;
	justify-content: flex-end;
}

.v-input--reverse .v-input--selection-controls__input {
	margin: 0 36px 0 12px;
}
</style>
