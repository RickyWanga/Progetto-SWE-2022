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
				<v-list-item
					v-for="(item, i) in items"
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
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="clipped"
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-text="title" />
			<v-spacer />
			<v-switch
				v-model="toggle_media"
				flat
				label="Media"
				:disabled="!( toggle_map || toggle_tagcloud )"
				@click.stop="$nuxt.$emit( 'toggle-media', toggle_media )"
			/>
			<v-switch
				v-model="toggle_map"
				flat
				label="Mappa"
				:disabled="!(toggle_media || toggle_tagcloud)"
				@click.stop="$nuxt.$emit( 'toggle-map', toggle_map )"
			/>
			<v-switch
				v-model="toggle_tagcloud"
				flat
				label="Tag Cloud"
				:disabled="!( toggle_media || toggle_map )"
				@click.stop="$nuxt.$emit( 'toggle-tagcloud', toggle_tagcloud )"
			/>
		</v-app-bar>
		<v-main>
			<Nuxt />
		</v-main>
		<v-navigation-drawer
			v-model="rightDrawer"
			:right="right"
			temporary
			fixed
		>
			<v-list>
				<v-list-item @click.native="right = !right">
					<v-list-item-action>
						<v-icon light>
							mdi-repeat
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>Switch drawer (click me)</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
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
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/'
				},
				{
					icon: 'mdi-application-edit-outline',
					title: 'Wireframe',
					to: 'https://wireframe.cc/WSmfNz'
				},
				{
					icon: 'mdi-application-edit',
					title: 'Wireframes',
					to: 'https://vuetifyjs.com/en/getting-started/wireframes/#examples'
				},
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'TED - Twitter Dashboard Extended',
			toggle_map: true,
			toggle_media: true,
			toggle_tagcloud: true,
		}
	},
}
</script>
