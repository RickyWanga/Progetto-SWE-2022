import CLIENT_CONFIGURATION from "./Configuration/ClientConfiguration"
import ApiAbstract from "./_ApiAbstract"

class ClientConfiguration extends ApiAbstract {

}

export default {

	path: "/api/client-configuration",

	handler( req, res ) {
		const clientConfiguration = new ClientConfiguration( req, res )
		clientConfiguration.respondWithJson( CLIENT_CONFIGURATION )
	}
}
