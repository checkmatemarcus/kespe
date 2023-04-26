import './App.css';
import axios from "axios"
import { useEffect, useState } from "react"
import { championMapping } from './util/championMasteryMapper';
import Tabs from './Tabs';


//"text-center max-w-xs flex justify-center" style={{margin: "auto"}}

function renderMasteryObject(el) {
  return (
    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-4">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{championMapping[el.championId]}</h5>
      </div>

      <div class="flex flex-col items-center ">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">

              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Mastery
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {el.championPoints}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">

              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Champion Level
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {el.championLevel}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">

              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Last Played
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {new Date(el.lastPlayTime).toLocaleString()}
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
  )
}


function App() {
  const [data, setData] = useState(null);
  /*const [dataModalitsu, setDataModalitsu] = useState(null);
  const [dataBalagurbiz, setDataBalagurbiz] = useState(null);
  const [dataBoobdude, setDataBoobdude] = useState(null);
  const [dataHAHA, setDataHAHA] = useState(null);*/
  

  // Mastery State
  const [summonerName, setSummonerName] = useState(""); // The summoner name entered by the user.
  const [region, setRegion] = useState("euw1"); // The region selected by the user.

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-a6e7e611-b5ed-41b4-84d2-18029e28e0d0`, {
    }).then((res) => {
      setData(res.data)
    })


    /*axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4`, {
    }).then((res) => {
      setDataModalitsu(res.data)
    })

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4`, {
    }).then((res) => {
      setDataBalagurbiz(res.data)
    })

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4`, {
    }).then((res) => {
      setDataBoobdude(res.data)
    })

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}?api_key=RGAPI-9bf19606-62c6-46e1-9ea0-caed51d16de4`, {
    }).then((res) => {
      setDataHAHA(res.data)
    })*/

    return response;
  }

  useEffect(() => {
    getSummonerMasteries("5YF-SXzQ8h3AlfDOmQ_uxXp7QECXL70xJKeQjuGd0PtNoXU")
  }, [])


  return (
    <>
      <Tabs>
      <div label="Home">
      <p class="text-center max-w-xs flex justify-center" style={{margin: "auto"}}>Kespe.no is currently undergoing a potential merger with alkulator.no. 
          As a result, the management is allocating most of its resources to mitigate potential confusion between the two parties. 
          New features will be added in the near future. Please bear with us as we work through any bugs that may arise. Stay sturdy with the kesper</p>
      </div>
      <div label="Kespejones">
      <h1 class="text-center max-w-xs flex justify-center" style={{margin: "auto"}}>Kespestatus?</h1>
      <p class = "text-center max-w-xs flex justify-center" style={{margin: "auto"}}>Once a briliant child in his domain, everything changed after the military. The kassernå was the place where he got introduced to 'blodbuging med forhuden'.
          A traditional term in the military, where every boy gathers in the kassernå and puts a 'kespe' in their 'forhud'.
          Once the tradition was learned, the child wandered through 'helvetesukå' and dimmmed in the mountain of blodbug.
          According to the legend, this is where the infant was forged to become Kespejones.
          Gutta glemme aldri dimmeturen til svalbard. 
      </p>
      </div>
      <div label="Dogcat">
        <p class="text-center max-w-xs flex justify-center" style={{margin: "auto"}}>ja, kanskje du skulle ha tatt ein bug i før du ganka top lane?</p>
        {data && data.map((masteryObject) => renderMasteryObject(masteryObject))}
      </div>
      <div label="Newsletter">
      <br></br>
      <h1 class="text-center max-w-xs flex justify-center" style={{margin: "auto"}}>Clash updates</h1>
      </div>
    </Tabs>
      <div className="App">
      {data && data.map((masteryObject) => renderMasteryObject(masteryObject))}
      <div>
      </div>
      </div>
    </>
  );
}

export default App;
