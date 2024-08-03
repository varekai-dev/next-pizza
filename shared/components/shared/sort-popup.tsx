'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/components/ui/popover'
import qs from 'qs'
import { useRouter } from 'next/navigation'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

interface Props {
    className?: string
    searchParams?: GetSearchParams
}

const sortItems = ['First Cheap', 'First Expensive']

export const SortPopup: React.FC<Props> = ({ className, searchParams }) => {
    const sortByQuery = Number(searchParams?.sortBy) || 1
    const router = useRouter()
    const [sortBy, setSortBy] = React.useState(sortByQuery)
    const [popoverOpen, setPopoverOpen] = React.useState(false)

    React.useEffect(() => {
        const query = qs.stringify(
            { ...searchParams, sortBy },
            {
                arrayFormat: 'comma',
            }
        )
        router.push(`?${query}`, { scroll: false })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy])

    const handleTogglePopover = () => {
        setPopoverOpen(!popoverOpen)
    }

    const handleClickSortItem = (index: number) => {
        setSortBy(index + 1)
        handleTogglePopover()
    }

    return (
        <Popover open={popoverOpen} onOpenChange={handleTogglePopover}>
            <PopoverTrigger asChild onClick={handleTogglePopover}>
                <div
                    className={cn(
                        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer select-none',
                        className
                    )}
                >
                    <ArrowUpDown className="w-4 h-4" />
                    <b>Sort:</b>

                    <b className="text-primary">{sortItems[sortBy - 1]}</b>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
                <ul>
                    {sortItems.map((item, index) => (
                        <li
                            key={index}
                            className="hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md select-none"
                            onClick={() => handleClickSortItem(index)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}
