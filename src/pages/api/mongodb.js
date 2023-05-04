import { MongoClient } from "mongodb";
import NodeCache from "node-cache";
import { getSummonerMasteryBySummonerId, getSummonerInfoByName, getClashDates } from "./riotAPI";
const cache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 600,
});

const uri = "mongodb+srv://vercel-admin-user:sBhDli5BMb65Q2Q5@kespe.3isg2qr.mongodb.net/databasen?retryWrites=true&w=majority";
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async () => {
  const dbClient = await clientPromise;
  const db = dbClient.db("databasen");

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
      console.log("Returning mastery from DB");

      return dbM;
    },
    getClashDates: async () => {
      const col = db.collection("clash-tournaments");
      const cacheTournaments = cache.get("tournaments");
      if (cacheTournaments) {
        console.log("got tournaments from cache");
        return cacheTournaments;
      }
      const tournaments = await col.find({}).toArray();
      if (!tournaments.length) {
        const clashTournaments = await getClashDates();
        cache.set("tournaments", clashTournaments);
        return clashTournaments;
      }
      cache.set("tournaments", tournaments);
      return tournaments;
    },
  };
};
