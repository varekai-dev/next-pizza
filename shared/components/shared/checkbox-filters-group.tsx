'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

import { Input, Skeleton } from '../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

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

  const sliceCount = (selectedValues?.size || 0) < limit ? limit : selectedValues?.size

  React.useEffect(() => {
    if (!showAll) {
      setSearch('')
    }
  }, [showAll])

  if (loading) {
    return (
      <div className={className}>
        <div className="mb-3 font-bold">{title}</div>
        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="mb-5 h-6 rounded-[8px]" />
        ))}
        <Skeleton className="mb-5 h-6 w-28 rounded-[8px]" />
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
    ? items.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
    : sortedItems.slice(0, sliceCount)

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className={className}>
      <div className="mb-3 font-bold">{title}</div>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            value={search}
            onChange={onChangeSearchInput}
            className="border-none bg-gray-50"
          />
        </div>
      )}
      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
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
            ['border-t-bg-neutral-100 mt-4 border-t']: showAll,
          })}
        >
          <button className="mt-3 text-primary" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Hide' : '+Show all'}
          </button>
        </div>
      )}
    </div>
  )
}
