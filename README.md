# Ted

Twitter Extended Dashboard

[![Twitter API v2 badge](https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2)](https://developer.twitter.com/en/docs/twitter-api/early-access)
[![pipeline status](https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project/badges/main/pipeline.svg)](https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project/-/commits/main)
[![coverage report](https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project/badges/main/coverage.svg)](https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project/-/commits/main)
[![Quality Gate Status](https://aminsep.disi.unibo.it/sonarqube/api/project_badges/measure?project=Ted-Team13&metric=alert_status)](https://aminsep.disi.unibo.it/sonarqube/dashboard?id=Ted-Team13)
[![Lines of Code](https://aminsep.disi.unibo.it/sonarqube/api/project_badges/measure?project=Ted-Team13&metric=ncloc)](https://aminsep.disi.unibo.it/sonarqube/dashboard?id=Ted-Team13)

## Environment variables

### Required

	TWITTER_BEARER_TOKEN=<ASK TWITTER>

### Optional

	TWITTER_API_BASEURL="https://api.twitter.com"
	TWITTER_PAGE_SIZE=100
	TWITTER_SEARCH_ARCHIVE_TYPE=RECENT [RECENT|ALL]
	SENTIMENT_PAGE_SIZE=5
	SENTIMENT_PAGE_INTERVAL=1000

## Production

HTTP Server and App provided via Docker image

## Development

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Documentation

* Wiki: https://aminsep.disi.unibo.it/project/admin-progetto-2021-team-13/wiki/home
* Wireframe: https://wireframe.cc/WSmfNz

## License

[MIT](https://aminsep.disi.unibo.it/gitlab/progetto-swe-gruppo-13/twitter-project/-/blob/main/LICENSE)
