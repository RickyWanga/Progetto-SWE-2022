import axios from "axios"

const TWITTER_API_PARAMS = {
	baseUrl: "https://api.twitter.com",
	bearer_token: process.env.TWITTER_BEARER_TOKEN,
}

export default {
	api() {
		return axios.create({
			baseURL: TWITTER_API_PARAMS.baseUrl,
			headers: {
				Authorization: "Bearer " + TWITTER_API_PARAMS.bearer_token,
			}
		})
	},
	urlApiParams( req ) {
		const url_req = req.url.substring( 2 ) // Strips the first two chars from url: "/?"
		return new URLSearchParams( url_req )
	},
	getUrlApiParam( param, req ) {
		const url_params = this.urlApiParams( req )
		return url_params.get( param )
	},
}
