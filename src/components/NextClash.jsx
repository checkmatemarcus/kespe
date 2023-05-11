import { useState, useEffect } from "react";
import { Timeline, HiCalendar, Button, HiArrowNarrowRight, Card } from "flowbite-react";
import { formatDuration, intervalToDuration } from 'date-fns'

export default function NextClash() {
    const [isLoading, setLoading] = useState(null);
    const [nextClashDates, setNextClashDates] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('/api/clash/clashDates')
            .then((res) => res.json())
            .then((data) => {
                setNextClashDates(data.clashDates)
                console.log(nextClashDates)
                setLoading(false)
            }
            )

    }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1);
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('nb-NO', options);
    }

    // A function that counts down the number of days until the clash match using date-fns
    const countdown = (timestamp) => {

        if (timestamp === undefined) return ""

        const date = new Date(timestamp * 1);
        let duration = intervalToDuration({
            end: new Date(),
            start: date,
        })

        formatDuration(duration, {
            delimiter: ', '
        })

        if (duration.days === 0 && duration.hours === 0 && duration.minutes === 0) return "Clash er i gang! 🏆"
        return `${duration.days} dager, ${duration.hours} timer og ${duration.minutes} minutter til neste kamp! 🏆 `
    }
    //add 1.5 seconds loading for each table
    if (isLoading) return <h1 className="flex justify-center items-center">Loading...</h1>
    if (!nextClashDates[0]) return <h1>No data found</h1>

    return (
        <Card>
            <b class="2xl text-red-500">Neste Clash ⚔️</b>
            <p class="text-red-500">{countdown(nextClashDates[0]?.schedule[0]?.startTime)}</p>
            <Button color="gray" href="https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360000951548-Clash-FAQ">
                <a href="https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360000951548-Clash-FAQ">Clash FAQ</a>
            </Button>
            <Timeline>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Title>
                            {nextClashDates[0].nameKeySecondary.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </Timeline.Title>
                        <Timeline.Body>
                            {formatDate(nextClashDates[0].schedule[0].startTime)}
                            <br />
                            <br />
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Title>
                            {nextClashDates[1].nameKeySecondary.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </Timeline.Title>
                        <Timeline.Body>
                            {formatDate(nextClashDates[1].schedule[0].startTime)}
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        </Card>
    )


}
