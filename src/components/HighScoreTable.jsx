import { useState, useEffect } from "react";
import { Table } from "flowbite-react";

const sortByHighestScore = (scores) => {
    // sort the scores by highest totalMasteryScore
    scores.sort((a, b) => {
        return b.totalMasteryScore - a.totalMasteryScore;
    });

    // Prefix the summonerName with the highest scores with emojis.
    const rankEmojis = ["🥇", "🥈", "🥉", "🤡", "💩"]
    scores.map((score, index) => {
        score.summonerName = rankEmojis[index] + " " + score.summonerName;
    });

    return scores
}

export default function HighScoreTable() {
    const [isLoading, setLoading] = useState(null);
    const [scores, setScores] = useState([]);
    const cacheTime = 10 * 60 * 1000; // Cache and revalidate data every 10 minutes

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch('/api/mastery/BPK Modalitsu', { next: { revalidate: cacheTime } }).then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK boobdude', { next: { revalidate: cacheTime } }).then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK balagurbiz', { next: { revalidate: cacheTime } }).then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK DOGCAT', { next: { revalidate: cacheTime } }).then((res) => res.json()).catch((err) => console.log(err)),
            fetch('/api/mastery/BPK HAHAHHAHAHAH', { next: { revalidate: cacheTime } }).then((res) => res.json()).catch((err) => console.log(err)),
        ]).then((results) => {
            const combinedData = results.flat()
            setScores(sortByHighestScore(combinedData))
            setLoading(false)
        })
    }, [])

    if (isLoading) return <h1 className="flex m-auto pt-20 self-center">Loading...</h1>
    if (!scores) return <h1>No data found</h1>


    const renderTableData = () => {
        return scores.map((score, index) => {

            const { summonerName, totalMasteryScore, totalChampionLevels } = score;
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
            </Table.Head>

            <Table.Body className="divide-y">
                {renderTableData()}
            </Table.Body>
        </Table>





    )
}
