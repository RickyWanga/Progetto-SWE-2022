import axios from "axios"

const TWITTER_API_PARAMS = {
	baseUrl: process.env.TWITTER_API_BASEURL || "https://api.twitter.com",
	bearer_token: process.env.TWITTER_BEARER_TOKEN,
	page_size: process.env.TWITTER_PAGE_SIZE || 100,
}

export default {
	api() {
		return axios.create({
			baseURL: TWITTER_API_PARAMS.baseUrl.replace(/\/$/, ""),
			headers: {
				"Authorization": "Bearer " + TWITTER_API_PARAMS.bearer_token,
				// "Accept-Encoding": "gzip, deflate, br",
			}
		})
	},
	getPageSize() {
		return TWITTER_API_PARAMS.page_size
	},
	getUrlApiParam( param, req ) {
		const url_params = this.getUrlApiParams( req )
		return url_params.get( param )
	},
	getUrlApiParams( req ) {
		const url_req = req.url.substring( 2 ) // Strips the first two chars from url: "/?"
		return new URLSearchParams( url_req )
	},
}
