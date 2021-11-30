import { createLocalVue, shallowMount } from "@vue/test-utils"
import Component from "@/components/Diagram/Diagram.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Diagrammi", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => shallowMount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			stubs: [
				"v-sparkline",
			],
			propsData: {
				labelValue: { labels: ["25/12","31/12"], values: [3,7] }
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})
})
