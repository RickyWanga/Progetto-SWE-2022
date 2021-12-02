import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/DiagramProgressCircular/DiagramProgressCircular.vue"

describe( "DiagramProgressCircular", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			propsData: {
				loading: false,
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "diagramColor1 computed property when loading", async () => {
		wrapper.setProps({ loading: true })
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.diagramColor1 ).toBe( `${ wrapper.vm.color1 } ${ wrapper.vm.lighten }` )
	})

	test( "diagramColor2 computed property when loading", async () => {
		wrapper.setProps({ loading: true })
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.diagramColor2 ).toBe( `${ wrapper.vm.color2 } ${ wrapper.vm.lighten }` )
	})
})
