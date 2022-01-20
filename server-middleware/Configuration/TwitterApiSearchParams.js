import TWITTER_API_PARAMS from "./TwitterApiParams"
import TWITTER_API_SEARCH_PARAMS_QUERY from "./TwitterApiSearchParamsQuery"

const TWITTER_API_SEARCH_PARAMS = {
	endpoint: `/2/tweets/search/${ "ALL" === TWITTER_API_PARAMS.search_archive?.toUpperCase()
		? "all"
		: "recent"
	}`,
	query_params: TWITTER_API_SEARCH_PARAMS_QUERY,
}

export default TWITTER_API_SEARCH_PARAMS
