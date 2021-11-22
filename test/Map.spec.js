import { createLocalVue, shallowMount } from "@vue/test-utils"
import Component from "@/components/Map/Map.vue"

describe( "Map", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => shallowMount( Component, Object.assign({
		local_vue,
		stubs: [
			"l-map",
			"l-tile-layer",
		],
	}, custom_options ))

	test( "is a Vue instance", () => {
		const wrapper = mountComponent({
			mocks: {
				$nuxt: {
					$on: () => {},
				},
			},
		})
		expect( wrapper.vm ).toBeTruthy()
	})
})
