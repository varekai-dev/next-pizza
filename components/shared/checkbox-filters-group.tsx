'use client'
import React from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input } from '../ui'
import { cn } from '@/lib/utils'

type Item = FilterCheckboxProps

interface Props {
    className?: string
    items: Item[]
    defaultItems: Item[]
    title: string
    limit?: number
    searchInputPlaceholder?: string
    defaultValue?: string[]
    onChange: (values: string[]) => void
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    className,
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    onChange,
    defaultValue,
}) => {
    const [showAll, setShowAll] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const list = showAll
        ? items.filter(item =>
              item.text.toLowerCase().includes(search.toLowerCase())
          )
        : defaultItems.slice(0, limit)

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    React.useEffect(() => {
        if (!showAll) {
            setSearch('')
        }
    }, [showAll])

    return (
        <div className={className}>
            <div className="font-bold mb-3">{title}</div>
            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        value={search}
                        onChange={onChangeSearchInput}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={ids => console.log(ids)}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div
                    className={cn({
                        ['border-t border-t-bg-neutral-100 mt-4']: showAll,
                    })}
                >
                    <button
                        className="text-primary mt-3"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Hide' : '+Show all'}
                    </button>
                </div>
            )}
        </div>
    )
}
