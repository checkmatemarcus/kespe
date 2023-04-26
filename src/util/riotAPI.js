import axios from 'axios';

const getSummonerMasteries = (accountId) => {
    let response;

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=${process.env.API_KEY}`, {
    }).then((res) => {
      response = res.data;
    })

    return response;
  }
