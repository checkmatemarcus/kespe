import {Kayn, REGIONS} from "kayn"

// Configure settings for Riot API calls.
export default Kayn(process.env.RIOT_LOL_API_KEY)({
    region: REGIONS.EUROPE_WEST,
    apiURLPrefix: 'https://euw1.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 2,
        delayBeforeRetry: 200,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
})
