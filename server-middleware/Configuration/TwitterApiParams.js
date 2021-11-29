const TWITTER_API_PARAMS = {
	base_url: process.env.TWITTER_API_BASEURL || "https://api.twitter.com",
	bearer_token: process.env.TWITTER_BEARER_TOKEN,
	page_size: process.env.TWITTER_PAGE_SIZE || 100,
}

export default TWITTER_API_PARAMS
