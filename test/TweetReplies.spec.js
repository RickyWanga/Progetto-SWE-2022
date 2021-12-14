import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/TweetReplies/TweetReplies.vue"

describe( "TweetReplies", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent()
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})
})
