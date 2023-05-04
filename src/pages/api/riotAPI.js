import axios from "axios"

// Create a new axios instance for communicating with the Riot API.
const riotAPI = axios.create({
    baseURL: "https://euw1.api.riotgames.com/lol",
    headers: { "X-Riot-Token": process.env.API_KEY }
})

export const getSummonerInfoByName = async (summonerName) => {
    // Get the summoner's account ID from their summoner name.
    const response = await riotAPI.get(`/summoner/v4/summoners/by-name/${summonerName}`)
    return response.data
}

export const getSummonerMasteryBySummonerId = async (accountId) => {
    // Get the summoner's mastery data from their account ID.
    const response = await riotAPI.get(`/champion-mastery/v4/champion-masteries/by-summoner/${accountId}`)
    return response.data
}

export const getClashDates = async () => {
    // Get the upcoming clash dates
    const response = await riotAPI.get(`/clash/v1/tournaments`)
    return response.data
}
