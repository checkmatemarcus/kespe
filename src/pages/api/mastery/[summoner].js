import axios from "axios"

// Create a new axios instance for communicating with the Riot API.
const riotAPI = axios.create({
  baseURL: "https://euw1.api.riotgames.com/lol",
  headers: { "X-Riot-Token": process.env.API_KEY }
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
const getSummonerMasteryByName = async (summonerName) => {
  // Get the summoner mastery data by name
  const summonerInfo = await getSummonerInfoByName(summonerName)
  const summonerMastery = await getSummonerMasteryByAccountId(summonerInfo.id)
  return summonerMastery
}

export default async function handler(req, res) {
  const input = req.query.summonerName
  let response;
  try {
    response = await getSummonerMasteryByName(input)
  } catch (error) {
    response = { ...error.response.data, hint: `Riot API key expired ${process.env.API_KEY}` }
  }
  res.status(200).json(response)

}
