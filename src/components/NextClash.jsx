import { useState, useEffect } from "react";
import { Timeline, HiCalendar, Button, HiArrowNarrowRight, Card } from "flowbite-react";
import { formatDuration, intervalToDuration } from 'date-fns'

export default function NextClash() {
    const [isLoading, setLoading] = useState(null);
    const [nextClashDates, setNextClashDates] = useState([]);

    // Cache and revalidate data every 15 minutes to prevent 429 errors
    const cacheTime = 15 * 60 * 1000;

    useEffect(() => {
        setLoading(true)
        fetch('/api/clash/clashDates', { next: { revalidate: cacheTime } })
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

    if (isLoading) return <h1 className="flex m-auto pt-20 self-center">Loading...</h1>
    if (!nextClashDates) return <h1>No data found</h1>

    return (
        <Card>
            <b className="2xl">Neste Clash ⚔️</b>
            <p>{countdown(nextClashDates[0]?.schedule[0]?.startTime)}</p>
            <Button color="gray">
                <a href="https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360000951548-Clash-FAQ">Clash FAQ</a>
            </Button>
            <Timeline>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Title>
                            {nextClashDates[0]?.nameKeySecondary?.replace(/_/g, " ")?.replace(/\b\w/g, l => l?.toUpperCase())}
                        </Timeline.Title>
                        <Timeline.Body>
                            {formatDate(nextClashDates[0]?.schedule[0]?.startTime)}
                            <br />
                            <br />
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                        <Timeline.Title>
                            {nextClashDates[1]?.nameKeySecondary?.replace(/_/g, " ")?.replace(/\b\w/g, l => l?.toUpperCase())}
                        </Timeline.Title>
                        <Timeline.Body>
                            {formatDate(nextClashDates[1]?.schedule[0]?.startTime)}
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            </Timeline>
        </Card>
    )


}
