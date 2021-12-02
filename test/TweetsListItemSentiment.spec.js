import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/Tweets/ListItem/Sentiment/Sentiment.vue"

describe( "Tweets ListItem Sentiment", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			propsData: {
				sentiment: {
					score: 99,
					value: 0.99,
				},
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "color computed property", () => {
		expect( wrapper.vm.color ).toBeTruthy()
	})

	test( "color computed property sentiment positive", () => {
		expect( wrapper.vm.color ).toBe( wrapper.vm.colors.positive )
	})

	test( "color computed property sentiment negative", async () => {
		wrapper.setProps({ sentiment: {
			score: 1,
			value: -0.01,
		}})
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.color ).toBe( wrapper.vm.colors.negative )
	})

	test( "color computed property sentiment neutral", async () => {
		wrapper.setProps({ sentiment: {
			score: 0,
			value: 0,
		}})
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.color ).toBe( wrapper.vm.colors.neutral )
	})
})
