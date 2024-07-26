'use client'
import React from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input, Skeleton } from '../ui'
import { cn } from '@/lib/utils'

type Item = FilterCheckboxProps

interface Props {
    className?: string
    items?: Item[]
    title: string
    limit?: number
    searchInputPlaceholder?: string
    onClickCheckbox?: (id: string) => void
    loading?: boolean
    selectedValues?: Set<string>
    name?: string
    sortSelectedFirst?: boolean
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    className,
    title,
    items = [],
    loading,
    limit = 5,
    searchInputPlaceholder = 'Search...',
    onClickCheckbox,
    selectedValues,
    name,
    sortSelectedFirst = false,
}) => {
    const defaultItems = [...items]
    const [showAll, setShowAll] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const sliceCount =
        (selectedValues?.size || 0) < limit ? limit : selectedValues?.size

    React.useEffect(() => {
        if (!showAll) {
            setSearch('')
        }
    }, [showAll])

    if (loading) {
        return (
            <div className={className}>
                <div className="font-bold mb-3">{title}</div>
                {Array.from({ length: limit }).map((_, index) => (
                    <Skeleton key={index} className="h-6 mb-5 rounded-[8px]" />
                ))}
                <Skeleton className="w-28 h-6 mb-5 rounded-[8px]" />
            </div>
        )
    }

    const sortedItems = sortSelectedFirst
        ? defaultItems.sort((a, b) => {
              const aSelected = selectedValues?.has(a.value) ? 1 : 0
              const bSelected = selectedValues?.has(b.value) ? 1 : 0
              return bSelected - aSelected
          })
        : defaultItems

    const list = showAll
        ? items.filter(item =>
              item.text.toLowerCase().includes(search.toLowerCase())
          )
        : sortedItems.slice(0, sliceCount)

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

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
                        name={name}
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedValues?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
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
