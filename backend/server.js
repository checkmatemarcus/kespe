import fetch from "node-fetch";
import express from 'express';
import cors from 'cors';

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

const riotAPI = "https://euw1.api.riotgames.com/lol"


// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'GET',
        headers:{
            "X-Riot-Token": "RGAPI-a6e7e611-b5ed-41b4-84d2-18029e28e0d0"
        }
        
    }
    const response = await fetch(riotAPI, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});