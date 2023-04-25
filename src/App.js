import './App.css';
import axios from "axios"
import { useEffect, useState } from "react"
import { championMapping } from './util/championMasteryMapper';


function renderMasteryObject(el) {
  return (
    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-4 ">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{championMapping[el.championId]}</h5>
      </div>

      <div class="flex flex-col items-center">
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



  return (
    <>
      <div className="App">
      <img src="https://akamai.vgc.no/v2/images/2911467c-2e4a-42a1-a33b-53a8a96aeb08?fit=crop&format=auto&h=1267&w=1900&s=b7eb326cd7846d781e19cff37bfc4e7a00e1b2a1"></img>

        <h1 class="text-3xl">Kespestatus?</h1>
        <p class="text-base">Once a briliant child in his domain, everything changed after the military. The kassernå was the place where he got introduced to 'blodbuging med forhuden'.
          A traditional term in the military, where every boy gathers in the kassernå and puts a 'kespe' in their 'forhud'.
          Once the tradition was learned, the child wandered through 'helvetesukå' and dimmmed in the mountain of blodbug.
          According to the legend, this is where the infant was forged to become Kespejones.
          Gutta glemme aldri dimmeturen til svalbard. </p>
      </div>

      <br></br>
      <h1 class="text-3xl">BPK DOGCAT</h1>
      
      <div>
        {data && data.map((masteryObject) => renderMasteryObject(masteryObject))}
      </div>
    </>
  );
}

export default App;
