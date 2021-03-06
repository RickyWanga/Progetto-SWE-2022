"use strict"
const colors = require( "vuetify/es5/util/colors" ).default

module.exports = {

	// Server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - TED - Twitter Extended Dashboard',
		title: 'TED - Twitter Extended Dashboard',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// https://nuxtjs.org/docs/configuration-glossary/configuration-loading/
	loading: false,

	// https://nuxtjs.org/docs/directory-structure/nuxt-config#privateruntimeconfig
	privateRuntimeConfig: {
		// …: process.env.…,
	},

	// https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
	serverMiddleware: [
		'~/server-middleware/ClientConfiguration.js',
		'~/server-middleware/Search.js',
		'~/server-middleware/Sentiment.js',
		'~/server-middleware/Stream.js',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		// '~/plugins/….js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		{ path: '~/components', extensions: ['vue'] },
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://github.com/schlunsen/nuxt-leaflet
		'nuxt-leaflet',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		browserBaseURL: process.env.API_URL_BROWSER,
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: "#1DA1F2", // Twitter (default: colors.blue.darken2),
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
}
