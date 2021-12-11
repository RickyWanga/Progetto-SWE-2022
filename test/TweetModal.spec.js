
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
					on: false
				}
			},
			stubs: [
				"v-dialog",
				"v-icon",
			],
			propsData: {
				show: false
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "methods.onoff() called on props update", async () => {
		const onoff = jest.spyOn( wrapper.vm, "onoff" )
		wrapper.setProps({ show: true })
		await wrapper.vm.$nextTick()
		expect( onoff ).toHaveBeenCalledTimes( 1 )
		expect(wrapper.vm.$data.on).toEqual( true )
	})

	test("watch.on ", async () => {
		wrapper.setData({ on:false })
		const vModdelOff = jest.spyOn( wrapper.vm, "vModelOff" )
		await wrapper.vm.$nextTick()
		expect( vModdelOff ).toHaveBeenCalledTimes( 1 )
	})
})
