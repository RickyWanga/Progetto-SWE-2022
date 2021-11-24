import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/Tweets/Tweets.vue"

describe( "Tweets Search Form", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
		vuetify,
	}, custom_options ))

	let vuetify
	let wrapper
	let tweetsForm
	let tweetsFormInput

	beforeAll(() => {
		vuetify = new Vuetify()
	})

	beforeEach(() => {
		wrapper = mountComponent({
			mocks: {
				$nuxt: {
					$emit: () => {},
				},
			},
			propsData: {
				tweets: []
			},
		})
		tweetsForm = wrapper.find( ".tweets-form" )
		tweetsFormInput = wrapper.find( ".tweets-form .v-input" )
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "tweets form input validation", async () => {
		expect( wrapper.vm.valid ).toBeFalsy()

		await tweetsFormInput.find( "input" ).setValue( "test" )
		await tweetsFormInput.trigger( "brur" )
		expect( wrapper.vm.valid ).toBeTruthy()
	})

	test( "tweets form submit", async () => {
		const spySubmit = jest.spyOn( wrapper.vm, "submit" )
		const test_query = "test"
		await tweetsFormInput.find( "input" ).setValue( test_query )
		await tweetsForm.trigger( "submit" )
		expect( spySubmit ).toHaveBeenCalled()
		expect( test_query === wrapper.vm.query ).toBeTruthy()
	})
})
