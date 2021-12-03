import SENTIMENT_API_PARAMS from "./Configuration/SentimentParams.js"
import ApiAbstract from "./_ApiAbstract.js"

class Sentiment extends ApiAbstract {
	#sentiment_url

	fetch( text, index ) {
		let data = {}
		return new Promise(( resolve ) => {
			this.httpGet( this.#sentiment_url, { params: {
				text: Buffer.from( text ).toString( "base64" ),
				index,
			}}).then(( response ) => {
				data = this._getData( response )
			}).catch(( error ) => {
				data = this._getDataError( error )
			}).finally(() => {
				resolve( data )
			})
		})
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
		sentiment.respondWithJson( data )
	}
}
