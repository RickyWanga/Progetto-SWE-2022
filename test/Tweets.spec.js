import { mount } from '@vue/test-utils'
import Tweets from '@/components/Tweets/Tweets.vue'

describe('Tweets', () => {
	test('is a Vue instance', () => {
		const wrapper = mount(Tweets)
		expect(wrapper.vm).toBeTruthy()
	})
})
