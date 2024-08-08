'use client'

import { useEffect, useState } from 'react'

const widthBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type Breakpoint = keyof typeof widthBreakpoints

const isClient = typeof window !== 'undefined'

export const useBreakpoint = (breakpoint: Breakpoint) => {
  const minWidth = widthBreakpoints[breakpoint]
  const [isMinWidth, setIsMinWidth] = useState(isClient ? window.innerWidth >= minWidth : false)

  useEffect(() => {
    if (!isClient) {
      return
    }
    const handleResize = () => {
      setIsMinWidth(window.innerWidth >= minWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [minWidth])

  return isMinWidth
}
