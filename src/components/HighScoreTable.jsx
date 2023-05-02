import { useState, useEffect } from "react";

const sortByHighestScore = (scores) => {
    // sort the scores by highest totalMasteryScore
    scores.sort((a, b) => {
        return b.totalMasteryScore - a.totalMasteryScore;
    });

    // Prefix the summonerName with the highest scores with emojis.
    scores[0].summonerName = "🥇 " + scores[0].summonerName;
    scores[1].summonerName = "🥈 " + scores[1].summonerName;
    scores[2].summonerName = "🥉 " + scores[2].summonerName;
    scores[4].summonerName = "💩 " + scores[4].summonerName;

    return scores
}

export default function HighScoreTable() {
    const [isLoading, setLoading] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch('/api/mastery/BPK Modalitsu').then((res) => res.json()),
            fetch('/api/mastery/BPK boobdude').then((res) => res.json()),
            fetch('/api/mastery/BPK balagurbiz').then((res) => res.json()),
            fetch('/api/mastery/BPK DOGCAT').then((res) => res.json()),
            fetch('/api/mastery/BPK HAHAHHAHAHAH').then((res) => res.json()),
        ]).then((results) => {
            const combinedData = results.flat()
            setScores(sortByHighestScore(combinedData))
            setLoading(false)
        })
    }, [])

    if (isLoading) return <h1 class="flex m-auto pt-20 self-center">Loading...</h1>
    if (!scores) return <h1>No data found</h1>


    const renderTableData = () => {
        return scores.map((score, index) => {

            const { summonerName, totalMasteryScore, totalChampionLevels } = score;
            return (
                <tr key={index} class="bg-white dark:bg-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {summonerName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">

                        {totalMasteryScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {totalChampionLevels}
                    </td>
                </tr>
            )
        })
    }



    return (
        <div className="text-white relative overflow-x-auto justify-center m-auto pt-20">
            <b class="text-4xl">Kim e svettast?</b>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Summoner
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total Mastery
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total Levels
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>

    )
}
