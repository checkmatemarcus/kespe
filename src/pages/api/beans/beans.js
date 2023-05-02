
export default async function handler(req, res) {
    const input = req.query.summoner
    res.status(200).json("beans")
}
