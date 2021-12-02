import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/pages/index.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Dashboard", () => {
	// @TODO
})

describe( "App", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			data() {
				return {
					tweets: Tweets,
				}
			},
			mocks: {
				$nuxt: {
					$on: () => {},
				},
			},
			stubs: [
				"Analytics",
				"Media",
				"TagCloud",
				"TweetsList",
				"TweetsListItem",
				"TweetsListItemSentiment",
			],
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "geo computed property", () => {
		expect( wrapper.vm.geo[ 0 ].target ).toBe( 1 )
	})

	test( "media computed property", () => {
		expect( wrapper.vm.media ).toBeFalsy()
	})

	test( "tags computed property", () => {
		expect( wrapper.vm.tags[ 0 ] ).toHaveLength( 2 )
	})
})
