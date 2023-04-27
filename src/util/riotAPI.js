import axios from "axios";

// Create a new axios instance for communicating with the Riot API.
const riotAPI = axios.create({
    baseURL: "http://localhost:5000",
})


// Exported functions to be used outside of this file:
export const getSummonerMasteryByName = async (summonerName) => {
    // Get the summoner mastery data by name
    const summonerMastery = await riotAPI.get(`/getMasteryByName/${summonerName}`)
    return summonerMastery
}
