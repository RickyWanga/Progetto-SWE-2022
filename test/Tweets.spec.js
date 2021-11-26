import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/components/Tweets/Tweets.vue"

describe( "Tweets Search Form", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper
	let tweetsForm
	let tweetsFormInput
	let tweetsFormInputEl

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
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
		tweetsFormInputEl = tweetsFormInput.find( "input" )
	})

	test( "is a Vue instance", () => {
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "tweets form input validation", async () => {
		expect( wrapper.vm.valid ).toBeFalsy()

		await tweetsFormInputEl.setValue( "test" )
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.valid ).toBeTruthy()
	})

	test( "tweets form submit", async () => {
		const spySubmit = jest.spyOn( wrapper.vm, "submit" )
		const test_query = "test"
		await tweetsFormInputEl.setValue( test_query )
		await tweetsForm.trigger( "submit" )
		expect( spySubmit ).toHaveBeenCalledTimes( 1 )
		expect( test_query === wrapper.vm.query ).toBeTruthy()
	})
})
