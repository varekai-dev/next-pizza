'use client'

import { useState, useEffect } from 'react'

const widthBreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

type Breakpoint = keyof typeof widthBreakpoints

export const useBreakpoint = (breakpoint: Breakpoint) => {
    const minWidth = widthBreakpoints[breakpoint]
    const [isMinWidth, setIsMinWidth] = useState(window.innerWidth >= minWidth)

    useEffect(() => {
        const handleResize = () => {
            setIsMinWidth(window.innerWidth >= minWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [minWidth])

    return isMinWidth
}
