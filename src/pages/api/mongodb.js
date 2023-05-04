const { MongoClient } = require("mongodb");
import NodeCache from "node-cache";
import { getSummonerMasteryBySummonerId, getSummonerInfoByName } from "./riotAPI";

const cache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 600,
});

let client;

export default async () => {
  const uri = "mongodb+srv://vercel-admin-user:sBhDli5BMb65Q2Q5@kespe.3isg2qr.mongodb.net/databasen?retryWrites=true&w=majority";
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
  }

  const db = client.db("databasen");

  return {
    getSummonerMasteryByName: async (name) => {
      const collection = db.collection("summoners");

      const cacheMastery = cache.get(`${name}Mastery`);
      if (cacheMastery) {
        console.log("Got mastery from cache");
        return cacheMastery;
      }

      let summoner = cache.get(name);
      if (summoner) console.log("Got summoner from Cache");

      if (!summoner) {
        summoner = await collection.findOne({ name });
        if (summoner) console.log("got summoner from DB");
      }

      if (!summoner) {
        summoner = await getSummonerInfoByName(name).catch((err) => {
          console.error("error in getting summonerInfoByName");
          if (err.response) {
            console.error(err.response.data);
          }
          console.error(err.stack);
        });
        console.log("Got summoner from API");
        await collection.updateOne({ id: summoner.id }, { $set: summoner }, { upsert: true });
      }
      cache.set(name, summoner);

      const masteryCol = db.collection("mastery");
      const dbM = await masteryCol.find({ summonerId: summoner.id }).toArray();
      if (!dbM.length) {
        const mastery = await getSummonerMasteryBySummonerId(summoner.id).catch((err) => {
          console.error("error in getting getSummonerMasterByAccountId");
          if (err.response) {
            console.error(err.response.data);
          }
          console.error(err.stack);
        });

        const updates = mastery.map((el) => {
          return {
            updateOne: {
              filter: { summonerId: summoner.id, championId: el.championId },
              update: { $set: el },
              upsert: true,
            },
          };
        });

        await masteryCol.bulkWrite(updates);

        console.log("Returning from API");
        cache.set(`${name}Mastery`, mastery);
        return mastery;
      }

      cache.set(`${name}Mastery`, dbM);
      console.log("Returning from DB");

      return dbM;
    },
  };
};
