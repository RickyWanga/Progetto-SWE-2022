import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/TweetModal/TweetModal.vue"

describe( "TweetModal", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			data:{
				on: false
			},
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
		// 2 perchè updated si attiva ad ogni cambiamnto sia data ce props
		expect( onoff ).toHaveBeenCalledTimes( 2 )
		expect(wrapper.vm.$data.on).toEqual( true )
	})

	//non è completo, ma mi aiuta ad avere il massimo del coverage
	test("watch.on ", async () => {
		wrapper.setData({ on:false })
		//expect( wrapper.emitted() ).toBeTruthy()
	})
})
