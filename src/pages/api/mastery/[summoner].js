import { getSummonerMasteryByName } from '../riotAPI'

export default async function handler(req, res) {
  const input = req.query.summoner
  let response;

  try {
    // Fetch raw data from Riot API
    const rawMasteryData = await getSummonerMasteryByName(input)

    // Get the total mastery score in raw data
    const totalMasteryScore = rawMasteryData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.championPoints
    }, 0)

    // Get the total champion levels in raw data
    const totalChampionLevels = rawMasteryData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.championLevel
    }, 0)

    response = {
      summonerName: input,
      totalMasteryScore: totalMasteryScore,
      totalChampionLevels: totalChampionLevels
    }
  } catch (error) {
    response = { ...error.response.data, hint: `Riot API key expired ${process.env.API_KEY}` }
  }

  res.status(200).json(response)
}
