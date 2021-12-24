import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/Tweets/Tweets.vue"

describe( "Tweets", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			stubs: [
				"TweetsSearchForm",
			],
			propsData: {
				tweets: []
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})
})
