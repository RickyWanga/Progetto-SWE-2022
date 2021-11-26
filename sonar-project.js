const scanner = require( "sonarqube-scanner" )
require( "dotenv" ).config()
scanner({ options: {
	"sonar.host.url": process.env.SONAR_HOST_URL
	"sonar.login": process.env.SONAR_LOGIN
}}, () => process.exit())
