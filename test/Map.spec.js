import { createLocalVue, shallowMount } from "@vue/test-utils"
import Component from "@/components/Map/Map.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Map", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => shallowMount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			mocks: {
				$nuxt: {
					$on: () => {},
				},
			},
			stubs: [
				"l-map",
				"l-marker",
				"l-tile-layer",
				"l-tooltip",
			],
			propsData: {
				geo: Tweets.filter(( tweet ) => !!tweet.geo?.target )
					.map(( tweet ) => ({ latlng: [ tweet.geo.latlng[0], tweet.geo.latlng[1] ]}))
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "latlng computed property", () => {
		expect( wrapper.vm.latlng[ 0 ][ 0 ] ).toBe( 1 )
		expect( wrapper.vm.latlng[ 0 ][ 1 ] ).toBe( 1 )
		expect( wrapper.vm.latlng[ 1 ][ 0 ] ).toBe( 2 )
		expect( wrapper.vm.latlng[ 1 ][ 1 ] ).toBe( 2 )
	})

	test( "methods.setNewBounds() called on props update", async () => {
		const setNewBounds = jest.spyOn( wrapper.vm, "setNewBounds" )
		wrapper.setProps({ geo: [] })
		await wrapper.vm.$nextTick()
		expect( setNewBounds ).toHaveBeenCalledTimes( 1 )
	})
})
