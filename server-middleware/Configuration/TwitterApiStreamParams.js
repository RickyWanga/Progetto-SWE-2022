import TWITTER_API_SEARCH_PARAMS_QUERY from "./TwitterApiSearchParamsQuery.js"

const TWITTER_API_STREAM_PARAMS = {
	endpoint: "/2/tweets/search/stream",
	query_params: TWITTER_API_SEARCH_PARAMS_QUERY,
	rules: {
		endpoint: "/2/tweets/search/stream/rules",
	},
}

export default TWITTER_API_STREAM_PARAMS
