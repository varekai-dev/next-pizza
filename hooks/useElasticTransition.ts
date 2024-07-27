import React from 'react'

export const useElasticTransition = (activeId: number, items: any[]) => {
    const refs = React.useRef<any[]>([])

    const [activeWidth, setActiveWidth] = React.useState(0)
    const [activeOffset, setActiveOffset] = React.useState(0)
    React.useEffect(() => {
        const activeElement =
            refs.current[items.findIndex(cat => cat.id === activeId)]
        if (activeElement) {
            setActiveWidth(activeElement.offsetWidth)
            setActiveOffset(activeElement.offsetLeft)
        }
    }, [activeId, items])

    return { refs, activeWidth, activeOffset }
}
