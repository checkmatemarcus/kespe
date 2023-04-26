import './App.css';
import React from 'react';
import { getSummonerMasteryByName } from './util/riotAPI';
import { useEffect, useState } from "react"
import { renderMasteryObject } from './components/ChampionMasteryComponent';

import Tabs from './Tabs';

function App() {
  // Mastery states for each summoner in BPK team:
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
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>"faen, de banna Kaisa"</p>
          <div style={{maxHeight: "200px"}}>
          {balagurbizMastery && balagurbizMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
          </div>
        </div>


        {/* Modamoda */}
        <div label="Modamoda">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>Best support EU</p>
          {modaMastery && modaMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

        {/* Sindre */}
        <div label="HAHAHAHAH">
          <p class="text-center max-w-xs flex justify-center" style={{ margin: "auto" }}>"har me jungler egentlig?"</p>
          {sindreMastery && sindreMastery.map((masteryObject) => renderMasteryObject(masteryObject))}
        </div>

      </Tabs>

    </>
  );
}

export default App;
