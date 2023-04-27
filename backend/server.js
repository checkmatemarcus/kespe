import express from 'express';
import cors from 'cors';
import {getSummonerMasteryByName} from './riotAPI.js';

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

app.get("/getMasteryByName/:name", cors(corsOptions), async (req, res) => {
    // Querry parameter is the summoner name, retreived from the URL path.
    const summonerName = req.params.name;
    let data;
    
    try {
        data = await getSummonerMasteryByName(summonerName);
    } catch (error) {
        data = {status: error.response.status, message: error.response.statusText}
    }
    res.json({data});
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
