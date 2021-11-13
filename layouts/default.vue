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
			<v-spacer></v-spacer>
			<div class="mapicon">
				<div id="vue-app">
					<v-btn
						icon
					>
						<input type="button" ref="input" />
						<v-icon>mdi-map</v-icon>
					</v-btn>
				</div>
			</div>
			<v-btn
				icon
				@click.stop="clipped = !clipped"
			>
				<v-icon>mdi-image</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="clipped = !clipped"
			>
				<v-icon>mdi-cloud</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="clipped = !clipped"
			>
				<v-icon>mdi-trending-up</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
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
			clipped: false,
			drawer: false,
			fixed: false,
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
			title: 'TED - Twitter Dashboard Extended'
		}
	}
}
</script>
