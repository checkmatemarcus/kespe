
const { MongoClient } = require('mongodb');
import { getSummonerMasteryBySummonerId, getSummonerInfoByName } from './riotAPI'

export default async () => {
    const uri = 'mongodb+srv://vercel-admin-user:sBhDli5BMb65Q2Q5@kespe.3isg2qr.mongodb.net/databasen?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('databasen');

    return {
        getSummonerMasteryByName: async (name) => {
            const collection = db.collection('summoners');
            let summoner = await collection.findOne({ name });
            if (summoner) console.log("Got summoner from DB");
            if (!summoner) {
                summoner = await getSummonerInfoByName(name).catch(err => {
                    console.error('error in getting summonerInfoByName')
                    if (err.response) {
                        console.error(err.response.data)
                    }
                    console.error(err.stack)
                })
                console.log("Got summoner from API")
                await collection.updateOne({ id: summoner.id }, { $set: summoner }, { upsert: true })
            }

            const masteryCol = db.collection('mastery')
            const dbM = await masteryCol.find({ summonerId: summoner.id }).toArray()
            if (!dbM.length) {
                const mastery = await getSummonerMasteryBySummonerId(summoner.id).catch(err => {
                    console.error('error in getting getSummonerMasterByAccountId')
                    if (err.response) {
                        console.error(err.response.data)
                    }
                    console.error(err.stack)
                })

                const updates = mastery.map(el => {
                    return {
                        updateOne: {
                            filter: { summonerId: summoner.id, championId: el.championId },
                            update: { $set: el },
                            upsert: true
                        }
                    }
                })

                await masteryCol.bulkWrite(updates)

                console.log("Returning from API")
                return mastery;
            }

            console.log("Returning from DB")

            return dbM;
        },
    }
}
