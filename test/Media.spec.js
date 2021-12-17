import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/Media/Media.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Media", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			propsData: {

			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "'show' property watch", async () => {
		wrapper.setProps({show: true})
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.imgWidth ).toBe('50%')
		wrapper.setProps({show: false})
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.imgWidth ).toBe('25%')
	})
})
