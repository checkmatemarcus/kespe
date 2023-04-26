import './App.css';
import React from 'react';
import axios from "axios"
import { getSummonerMasteryByName } from './util/riotAPI';
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
  const [kespejonesMastery, setKespeJonesMastery] = useState(null);
  const [dogcatMastery, setDogcatMastery] = useState(null);
  const [sindreMastery, setSindreMastery] = useState(null);
  const [balagurbizMastery, setBalagurbizMastery] = useState(null);
  const [modaMastery, setModaMastery] = useState(null);


  const fetchDataAndSetToState = async () => {
    setKespeJonesMastery(await getSummonerMasteryByName("BPK boobdude"))
    setDogcatMastery(await getSummonerMasteryByName("BPK DOGCAT"))
    setSindreMastery(await getSummonerMasteryByName("BPK HAHAHHAHAHAH"))
    setModaMastery(await getSummonerMasteryByName("BPK Modalitsu"))
    setBalagurbizMastery(await getSummonerMasteryByName("BPK Balagurbiz"))
  }


  useEffect(() => {
    fetchDataAndSetToState()
  }, [])


  return (
    <>
      <Tabs>
        {/* LOTHE */}
        <div label="Home">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>Kespe.no is currently undergoing a potential merger with alkulator.no.
            As a result, the management is allocating most of its resources to mitigate potential confusion between the two parties.
            New features will be added in the near future. Please bear with us as we work through any bugs that may arise. Stay sturdy with the kesper</p>
        </div>

        {/* KESPE JONES */}
        <div label="Kespejones">
          <h1 class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>Kespestatus?</h1>
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>Once a briliant child in his domain, everything changed after the military. The kassernå was the place where he got introduced to 'blodbuging med forhuden'.
            A traditional term in the military, where every boy gathers in the kassernå and puts a 'kespe' in their 'forhud'.
            Once the tradition was learned, the child wandered through 'helvetesukå' and dimmmed in the mountain of blodbug.
            According to the legend, this is where the infant was forged to become Kespejones.
            Gutta glemme aldri dimmeturen til svalbard.
          </p>
          {kespejonesMastery && kespejonesMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

        {/* DOGCAT */}
        <div label="Dogcat">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>ja, kanskje du skulle ha tatt ein bug i før du ganka top lane?</p>
          {dogcatMastery && dogcatMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

        {/* BALAGARBAGE */}
        <div label="Balagorbies">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>ja, kanskje du skulle ha tatt ein bug i før du ganka top lane?</p>
          {balagurbizMastery && balagurbizMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>


        {/* Modamoda */}
        <div label="Modamoda">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>ja, kanskje du skulle ha tatt ein bug i før du ganka top lane?</p>
          {modaMastery && modaMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

        {/* Modamoda */}
        <div label="HAHAHAHAH">
          <p>Belveth support OP</p>
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>ja, kanskje du skulle ha tatt ein bug i før du ganka top lane?</p>
          {sindreMastery && sindreMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

      </Tabs>

    </>
  );
}

export default App;
