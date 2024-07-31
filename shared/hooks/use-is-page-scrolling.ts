import React from 'react'

export const useIsPageScrolling = () => {
    const [isScrolling, setIsScrolling] = React.useState(false)

    React.useEffect(() => {
        let scrollTimeout: NodeJS.Timeout

        const handleScroll = () => {
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

    return isScrolling
}
