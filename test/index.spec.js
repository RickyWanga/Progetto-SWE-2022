import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"
import Component from "@/pages/index.vue"

const Tweets = require( "./data/tweets.json" )

describe( "Dashboard", () => {
	// @TODO
})

describe( "App", () => {
	const local_vue = createLocalVue()
	const mountComponent = ( custom_options = {} ) => mount( Component, Object.assign({
		local_vue,
	}, custom_options ))

	let wrapper

	beforeAll(() => {
		wrapper = mountComponent({
			vuetify: new Vuetify(),
			data() {
				return {
					client_configuration: {
						SENTIMENT_PAGE_SIZE: 5,
						SENTIMENT_PAGE_INTERVAL: 0,
					},
					http_config: {
						module: {
							get: () => {},
						},
					},
					sentiments: {
						pos: 1,
						neg: 0,
					},
					stream: {
						active: false,
						module: {},
						query: "",
					},
					tweets: Tweets,
				}
			},
			mocks: {
				$axios: {
					$get: () => Promise.resolve({ score: 0.99 })
				},
				$nuxt: {
					$emit: () => {},
					$on: () => {},
				},
			},
			stubs: [
				"Analytics",
				"Diagram",
				"Media",
				"TagCloud",
				"Tweets",
				"Tweet",
				"TweetSentiment",
			],
		})
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test( "is a Vue instance", () => {
		wrapper.vm.tweets = Tweets
		expect( wrapper.vm ).toBeTruthy()
	})

	test( "geo computed property", () => {
		expect( wrapper.vm.geo[ 0 ].target ).toBe( 1 )
	})

	test( "media computed property", () => {
		expect( wrapper.vm.media ).toBeFalsy()
	})

	test( "sentiment computed property", () => {
		wrapper.vm.sentiments = {
			pos: 1,
			neg: 0,
		}
		expect( wrapper.vm.sentiment ).toMatchObject({
			positive: 50,
			negative: 0,
		})
	})

	test( "tags computed property", () => {
		expect( wrapper.vm.tags[ 0 ] ).toHaveLength( 2 )
	})

	test( "methods.initData()", async () => {
		wrapper.vm.initData()
		await wrapper.vm.$nextTick()
		expect( wrapper.vm.tweets.length ).toBe( 0 )
		expect( wrapper.vm.sentiments.loading ).toBe( true )
		expect( wrapper.vm.sentiments.neg ).toBe( 0 )
		expect( wrapper.vm.sentiments.pos ).toBe( 0 )
	})

	test( "methods.onQuery() with empty 'query'", () => {
		const spyOnQuery = jest.spyOn( wrapper.vm, "onQuery" )
		const spyGetTweets = jest.spyOn( wrapper.vm, "getTweets" )
		wrapper.vm.onQuery({ query: "" })
		expect( spyOnQuery ).toHaveBeenCalledTimes( 1 )
		expect( spyGetTweets ).toHaveBeenCalledTimes( 0 )
	})

	test( "methods.onQuery() with 'query'", () => {
		const spyOnQuery = jest.spyOn( wrapper.vm, "onQuery" )
		const spyGetTweets = jest.spyOn( wrapper.vm, "getTweets" )
		wrapper.vm.showAlert = () => {} // Mock
		wrapper.vm.onQuery({ query: "test" })
		expect( spyOnQuery ).toHaveBeenCalledTimes( 1 )
		expect( spyGetTweets ).toHaveBeenCalledTimes( 1 )
	})

	test( "methods.onStreamToggle()", () => {
		wrapper.vm.stream.module.start = () => {} // Mock
		wrapper.vm.stream.module.stop = () => {} // Mock
		const spyStart = jest.spyOn( wrapper.vm.stream.module, "start" )
		const spyStop = jest.spyOn( wrapper.vm.stream.module, "stop" )
		// Test branch 1
		wrapper.vm.onStreamToggle( true )
		expect( spyStart ).toHaveBeenCalledTimes( 1 )
		expect( wrapper.vm.stream.query ).toBe( null )
		expect( wrapper.vm.stream.active ).toBe( true )
		// Test branch 2
		wrapper.vm.onStreamToggle( false )
		expect( spyStop ).toHaveBeenCalledTimes( 1 )
		expect( wrapper.vm.stream.active ).toBe( false )
	})

	test( "methods.setStreamQuery()", () => {
		wrapper.vm.stream.module.setQuery = () => {} // Mock
		const spy = jest.spyOn( wrapper.vm.stream.module, "setQuery" )
		const query = "example_query"
		// Test branch 1
		wrapper.vm.stream.active = true
		wrapper.vm.setStreamQuery( query )
		expect( spy ).toHaveBeenCalledTimes( 1 )
		expect( wrapper.vm.stream.query ).toBe( null )
		// Test branch 2
		wrapper.vm.stream.active = false
		wrapper.vm.setStreamQuery( query )
		expect( wrapper.vm.stream.query ).toBe( query )
	})
})
