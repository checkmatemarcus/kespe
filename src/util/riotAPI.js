import axios from "axios"

// Create a new axios instance for communicating with the Riot API.
const riotAPI = axios.create({
    baseURL: "https://euw1.api.riotgames.com/lol",
    headers: {"X-Riot-Token": "RGAPI-a6e7e611-b5ed-41b4-84d2-18029e28e0d0"}
})


const getSummonerInfoByName = async (summonerName) => {
    // Get the summoner's account ID from their summoner name.
    const response = await riotAPI.get(`/summoner/v4/summoners/by-name/${summonerName}`)
    return response.data
}

const getSummonerMasteryByAccountId = async (accountId) => {
    // Get the summoner's mastery data from their account ID.
    const response = await riotAPI.get(`/champion-mastery/v4/champion-masteries/by-summoner/${accountId}`)
    return response.data
}

// Exported functions to be used outside of this file:
export const getSummonerMasteryByName = async (summonerName) => {
    // Get the summoner mastery data by name
    const summonerInfo = await getSummonerInfoByName(summonerName)
    const summonerMastery = await getSummonerMasteryByAccountId(summonerInfo.id)
    return summonerMastery
}
