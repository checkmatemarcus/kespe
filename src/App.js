import './App.css';

import { useState } from "react"
import { Label, TextInput, Select } from 'flowbite-react';


function App() {
  // Application State
  const [data, setData] = useState(null); // Data retrieved from third party API.
  const [page, setPage] = useState("Home"); // The current page viewed by the user.

  // Mastery State
  const [summonerName, setSummonerName] = useState(""); // The summoner name entered by the user.
  const [region, setRegion] = useState("euw1"); // The region selected by the user.

  if (page === "Home") {
    return (
      <>
        <section class="bg-white dark:bg-gray-900">
          <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Kespe.no</h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From running down mid, to belveth support. Gamers around the world use <b>Kespe.no</b> to find their ultimate league of legends <b>schizo</b> comps!</p>
              <button type="button" onClick={() => setPage("mastery")} class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Unleash Your Game</button>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="https://cdn.shopify.com/s/files/1/0014/9694/0602/products/X-Gamer---Watermelon-Energy-pouches-2_900x.png?v=1678476923" alt="mockup" />
            </div>
          </div>
        </section>
      </>
    );
  } else if (page === "mastery") {
    return (
      <div class=" max-w-screen-sm px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div id="select">
          <div className="mb-2 block">
            <Label
              htmlFor="region"
              value="Select Region"
            />
          </div>
          <Select onChange={(e) => setRegion(e.target.value)}
            id="region"
            required={true}
          >
            <option>
              EU West
            </option>
            <option>
              EU Nordic & East
            </option>
            <option>
              Europe
            </option>
            <option>
              Brazil
            </option>
          </Select>
        </div>
        <br></br>
        <div className="mb-4 block">
          <Label htmlFor="username" value="Enter your summoner name" />
        </div>
        <TextInput
          onChange={(e) => setSummonerName(e.target.value)}
          id="username3"
          placeholder="Faker"
          required={true}
          addon="🌟"
        />

        <div class="py-8 px-5">
          <button type="button" onClick={() => setPage("stats")} class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Kespe Analysis</button>
        </div>
      </div>
    )
  } else if (page === "stats") {


    return (
      <>
        <h2>KESPE STATUUUUS MAMMAA</h2>
        <p>{summonerName}</p>
        <p>{region}</p>
      </>
    )
  }
}

export default App;
