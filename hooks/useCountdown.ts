import { useEffect, useState } from 'react'

function useCountDown() {
    const [targetTimestamp, setTargetTimestamp] = useState<number | null>(null)
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [isCountdown, setIsCountdown] = useState<boolean>(false)

    const start = (targetTimestamp: number) => !isCountdown && setTargetTimestamp(targetTimestamp)

    useEffect(() => {
        let interval: any

        if (targetTimestamp !== null) {
            const callCountDown = () => {
                if (targetTimestamp <= new Date().getTime()) {
                    setIsCountdown(false)
                    clearInterval(interval)
                }

                if (targetTimestamp >= new Date().getTime() - 1000) {
                    const remainingTimestamp = targetTimestamp - new Date().getTime() + 1000
                    setDays(Math.floor(remainingTimestamp / (1000 * 60 * 60 * 24)))
                    setHours(Math.floor((remainingTimestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
                    setMinutes(Math.floor((remainingTimestamp % (1000 * 60 * 60)) / (1000 * 60)))
                    setSeconds(Math.floor((remainingTimestamp % (1000 * 60)) / 1000))
                }
            }

            setIsCountdown(true)
            callCountDown()
            interval = setInterval(callCountDown, 1000)
        }
    }, [targetTimestamp])

    return {
        days,
        hours,
        minutes,
        seconds,
        start,
        isCountdown,
    }
}

export default useCountDown