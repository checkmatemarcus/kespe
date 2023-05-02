// NexJS endpoint for upcoming clash dates
import { getClashDates } from "../riotAPI"

export default async function handler(req, res) {
    let response;

    try {
        // Fetch raw data from Riot API
        const rawClashDates = await getClashDates()

        // Get the total mastery score in raw data
        const clashDates = rawClashDates.map((date) => {
            return date
        })

        response = {
            clashDates: clashDates
        }
    } catch (error) {
        response = { ...error.response.data, hint: `Riot API key expired ${process.env.API_KEY}` }
    }

    res.status(200).json(response)
}
