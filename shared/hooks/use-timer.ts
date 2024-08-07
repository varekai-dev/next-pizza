'use client'

import React from 'react'

export const useTimer = (time: number, onComplete: () => void) => {
    const [timeLeft, setTimeLeft] = React.useState(time)
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            } else {
                onComplete()
                setTimeLeft(0)
                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [timeLeft])

    return {
        timeLeft,
        setTimeLeft,
    }
}
