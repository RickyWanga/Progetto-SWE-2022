import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/pages/index.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Dashboard", () => {
	// @TODO
})

describe( "Tweets List", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
		vuetify,
	}, custom_options ))

	let vuetify
	let wrapper

	beforeAll(() => {
		vuetify = new Vuetify()
	})

	beforeEach(() => {
		wrapper = mountComponent({
			mocks: {
				$nuxt: {
					$on: () => {},
				},
			},
			stubs: [
				"Media",
				"TagCloud",
				"Tweets",
			],
		})
		wrapper.setData({ tweets: Tweets })
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "computed property: geo", () => {
		expect( wrapper.vm.geo[ 0 ].target ).toBe( 1 )
	})

	test( "computed property: media", () => {
		expect( wrapper.vm.media ).toBeFalsy()
	})

	test( "computed property: tags", () => {
		expect( wrapper.vm.tags[ 0 ] ).toHaveLength( 2 )
	})
})
