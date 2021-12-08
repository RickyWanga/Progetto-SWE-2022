import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/TweetReplys/TweetReplys.vue"

describe( "TweetReplays", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			propsData: {
				tweets: [],
				tweet_modal_tweet: [],
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})
})
