import React from 'react'

export const useElasticTransition = ({
    activeEl,
    items,
    findBy = 'id',
}: {
    activeEl?: number | string
    items: any[]
    findBy?: 'id' | 'value'
}) => {
    const refs = React.useRef<any[]>([])

    const [activeWidth, setActiveWidth] = React.useState(0)
    const [activeOffset, setActiveOffset] = React.useState(0)
    React.useEffect(() => {
        const activeElement =
            refs.current[items.findIndex(cat => cat[findBy] === activeEl)]
        if (activeElement) {
            setActiveWidth(activeElement.offsetWidth)
            setActiveOffset(activeElement.offsetLeft)
        }
    }, [activeEl, items, findBy])

    return { refs, activeWidth, activeOffset }
}
