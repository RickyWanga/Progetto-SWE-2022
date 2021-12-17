
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/TweetModal/TweetModal.vue"

describe( "TweetModal", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	local_vue.use(Vuetify)

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			data() {
				return {
					on: true
				}
			},
			mocks: {
				$nuxt: {
					$emit: () => {},
				},
			},
			stubs: [
				"v-dialog",
				"v-icon",
			],
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "watch.on", async () => {
		const spy = jest.spyOn( wrapper.vm, "vModalOff" )
		wrapper.setData({ on: false })
		await wrapper.vm.$nextTick()
		expect( spy ).toHaveBeenCalledTimes( 1 )
	})
})
