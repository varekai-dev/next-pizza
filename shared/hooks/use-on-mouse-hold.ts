import React from 'react'

export const useOnMouseHold = ({ intervalMs, targetMs }: { intervalMs: number; targetMs: number }) => {
  const [timeMs, setTimeMs] = React.useState(0)
  const [isPressed, setIsPressed] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [isFinished, setIsFinished] = React.useState(false)

  const buttonPressDown = () => {
    setIsPressed(true)
  }

  const buttonPressUp = () => {
    setIsPressed(false)
    setTimeMs(0)
    setProgress(0)
    setIsFinished(false)
  }

  React.useEffect(() => {
    let interval: any
    if (isPressed) {
      interval = setInterval(() => {
        setTimeMs((prev) => prev + intervalMs)
      }, intervalMs)
    }
    if (isFinished) {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isPressed, intervalMs, isFinished])

  React.useEffect(() => {
    if (progress >= 100 && !isFinished) {
      setIsFinished(true)
    }
    if (!isFinished) {
      const percent = ((timeMs / targetMs) * 100).toFixed(0)
      setProgress(Number(percent))
    }
  }, [timeMs, targetMs, progress, isFinished])

  return {
    buttonPressDown,
    buttonPressUp,
    timeMs,
    isFinished,
    progressInPercent: progress,
    isPressed,
  }
}
