import './App.css';
import axios from "axios"
import { useEffect, useState } from "react"


function App() {
  const [data, setData] = useState(null);
  const API_KEY = "RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4"

  const getSummonerMasteries = (accountId) => {
    let response;

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4`, {
    }).then((res) => {
      setData(res.data)
    })

    return response;
  }

  useEffect(() => {
    getSummonerMasteries("5YF-SXzQ8h3AlfDOmQ_uxXp7QECXL70xJKeQjuGd0PtNoXU")
  }, [])

  console.log(data)

  return (
    <>
      <div className="App">
        <h1>Kespestatus?</h1>
        <p>Once a briliant child in his domain, everything changed after the military. The kassernå was the place where he got introduced to 'blodbuging med forhuden'.
          A traditional term in the military, where every boy gathers in the kassernå and puts a 'kespe' in their 'forhud'.
          Once the tradition was learned, the child wandered through 'helvetesukå' and dimmmed in the mountain of blodbug.
          According to the legend, this is where the infant was forged to become Kespejones.
          Gutta glemme aldri dimmeturen til svalbard. </p>
      </div>

      <div>
        {data && data.map((masteryObject) => {
          return (
            <div key={masteryObject.championId + masteryObject.championPoints + masteryObject.lastPlayTime } >
              <p>Champion ID: {masteryObject.championId}</p>
              <p>Champion Points: {masteryObject.championPoints}</p>
            </div>
          )
        })}
      </div>


    </>
  );
}

export default App;
