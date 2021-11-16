<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
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
						:href="item.to"
						target="_blank"
					>
						<v-list-item-action>
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
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
			<span>🄯 {{ new Date().getFullYear() }}</span>
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
					icon: 'mdi-application-edit-outline',
					title: 'Wireframe',
					to: 'https://wireframe.cc/WSmfNz'
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
