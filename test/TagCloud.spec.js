import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/TagCloud/TagCloud.vue"

describe( "TagCloud", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({		//prima di eseguire un test fa il mount del compoenent
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			stubs: [						//Indicare i compoenenti da ignorare nel test
				"TweetsSearchForm",
			],
			propsData: {					//Indicare con i quali dati da testare
				tags: [["tag1", 4], ["tag2", 7], ["tag3", 5], ["tag4", 3]]
			},
		})
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "Color computed property", () => {
		const colorFunction = wrapper.vm.color
		expect( colorFunction(wrapper.vm.tags[0])).toBe("DeepPink")
		expect( colorFunction(wrapper.vm.tags[1])).toBe("RoyalBlue")
		expect( colorFunction(wrapper.vm.tags[2])).toBe("Indigo")
		expect( colorFunction(wrapper.vm.tags[3])).toBe("CornflowerBlue")
	})

	test( "rotationFunction method", () => {
		expect( wrapper.vm.rotationFunction("tag1", 2) ).toBe(0)
	})
})
