import db from '../../mongodb'

export default async function handler(req, res) {
    const client = await db()
    const input = req.query.summoner
    let response;

    try {
        // Fetch raw data from Riot API
        const rawMasteryData = await client.getSummonerMasteryByName(input)
    } catch (error) {
        console.log(error.stack)
    }

    res.status(201).json(response)
}
