const scanner = require( "sonarqube-scanner" )
require( "dotenv" ).config()
scanner({ options: {
	"sonar.login": process.env.SONAR_LOGIN
}}, () => process.exit())
