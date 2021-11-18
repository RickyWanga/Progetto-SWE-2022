import { createLocalVue, shallowMount } from "@vue/test-utils"
import Component from "@/components/Tweets/Tweets.vue"

describe( "Tweets", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => shallowMount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	test( "is a Vue instance", () => {
		const wrapper = mountComponent()
		expect( wrapper.vm ).toBeTruthy()
	})
})
