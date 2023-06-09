import { useState, useEffect } from "react";
import { Table } from "flowbite-react";

const sortByHighestScore = (scores) => {
    // sort the scores by highest totalMasteryScore
    console.log(scores)
    scores.sort((a, b) => {
        return b.totalMasteryScore - a.totalMasteryScore;
    });

    // Prefix the summonerName with the highest scores with emojis.
    const rankEmojis = ["🥇", "🥈", "🥉", "🤡", "💩"]
    scores.map((score, index) => {
        score.url = score.summonerName
        score.summonerName = rankEmojis[index] + " " + score?.summonerName;
    });

    return scores
}

export default function HighScoreTable() {
    const [isLoading, setLoading] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch('/api/mastery/BPK Modalitsu').then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK boobdude').then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK balagurbiz').then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK DOGCAT').then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK HAHAHHAHAHAH').then((res) => res.json()).catch((err) => console.log(err)),
        ]).then((results) => {
            const combinedData = results.flat()
            setScores(sortByHighestScore(combinedData))
            setLoading(false)
        })
    }, [])

    if (isLoading) return <h1 class="flex justify-center items-center">Loading...</h1>
    if (!scores) return <h1>No data found</h1>


    const renderTableData = () => {
        return scores.map((score, index) => {

            const { summonerName, totalMasteryScore, totalChampionLevels, profile, url } = score;
            return (
                <Table.Row key={summonerName} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {summonerName ?? "rusk i maskineriet.. 🤔"}
                    </Table.Cell>
                    <Table.Cell>
                        {totalMasteryScore?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "rusk i maskineriet.. 🤔"}
                    </Table.Cell>
                    <Table.Cell>
                        {totalChampionLevels ?? "rusk i maskineriet.. 🤔"}
                    </Table.Cell>
                    <Table.Cell>
                        {profile ?? <a href={'/profile/' + url}>{String.fromCharCode(0x2192)}</a>}
                    </Table.Cell>
                </Table.Row>
            )
        })
    }



    return (
        <Table hoverable={true}>
            <Table.Head>
                <Table.HeadCell>
                    Summoner
                </Table.HeadCell>
                <Table.HeadCell>
                    Total Mastery
                </Table.HeadCell>
                <Table.HeadCell>
                    Total LVL
                </Table.HeadCell>
                <Table.HeadCell>
                    <a>profile</a>
                </Table.HeadCell>
            </Table.Head>


            <Table.Body className="divide-y">
                {renderTableData()}
            </Table.Body>
        </Table>





    )
}
