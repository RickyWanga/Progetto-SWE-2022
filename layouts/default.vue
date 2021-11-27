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
			<template #append>
				<v-list>
					<v-list-item
						v-for="(item, i) in navigation_items"
						:key="i"
						href="http://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13"
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
export default {
	data () {
		return {
			clipped: true,
			drawer: false,
			fixed: true,
			miniVariant: false,
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
					to: 'http://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13'
				},
			],
			title: 'TED - Twitter Extended Dashboard',
			toggle_map: true,
			toggle_media: true,
			toggle_tagcloud: true,
		}
	},
}
</script>
