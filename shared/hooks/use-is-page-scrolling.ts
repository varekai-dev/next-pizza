import React from 'react'

export const useIsPageScrolling = () => {
    const [isScrolling, setIsScrolling] = React.useState(false)
    const [scrollY, setScrollY] = React.useState(0)

    React.useEffect(() => {
        let scrollTimeout: NodeJS.Timeout

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY === scrollY) {
                return
            }

            setScrollY(currentScrollY)
            setIsScrolling(true)
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false)
            }, 100)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(scrollTimeout)
        }
    }, [])

    return { isScrolling, scrollY }
}
