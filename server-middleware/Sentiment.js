import SENTIMENT_API_PARAMS from "./Configuration/SentimentParams.js"
import ApiAbstract from "./_ApiAbstract.js"

class Sentiment extends ApiAbstract {
	#sentiment_url

	fetch( text ) {
		return this.httpGet( this.#sentiment_url, { params: {
			text: Buffer.from( text ).toString( "base64" ),
		}})
	}

	constructor( req, res, api_params ) {
		super( req, res, api_params.BASE_URL )
		this.#sentiment_url = api_params.SENTIMENT_ANALYSIS_URL
	}
}

export default {

	path: "/api/sentiment",

	async handler( req, res ) {
		const sentiment = new Sentiment( req, res, SENTIMENT_API_PARAMS )
		const text = sentiment.getUrlApiParam( "text" )
		const index = sentiment.getUrlApiParam( "index" )
		const data = await sentiment.fetch( text, index )
		sentiment.respondJson( data )
	}
}
