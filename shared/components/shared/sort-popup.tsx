'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import { ArrowUpDown } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { sortTypes } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import { GetSearchParams } from '@/shared/services/categories'

interface Props {
  className?: string
  searchParams?: GetSearchParams
}

export const SortPopup: React.FC<Props> = ({ className, searchParams }) => {
  const isMounted = React.useRef(false)
  const sortByQuery = searchParams?.sortBy || sortTypes[0].value
  const router = useRouter()
  const [sortBy, setSortBy] = React.useState(sortByQuery)
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  React.useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify(
        { ...searchParams, sortBy },
        {
          arrayFormat: 'comma',
        },
      )
      router.push(`?${query}`, { scroll: false })
    }
    isMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  const handleTogglePopover = () => {
    setPopoverOpen(!popoverOpen)
  }

  const handleClickSortItem = (sortType: string) => {
    setSortBy(sortType)
    handleTogglePopover()
  }

  const selectedText = sortTypes.find((item) => item.value === sortBy)?.text
  return (
    <Popover open={popoverOpen} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild onClick={handleTogglePopover}>
        <div
          className={cn(
            'inline-flex h-[52px] cursor-pointer select-none items-center gap-1 rounded-2xl bg-gray-50 px-5',
            className,
          )}
        >
          <ArrowUpDown className="size-4" />
          <b>Sort:</b>

          <b className="text-primary">{selectedText}</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <ul>
          {sortTypes.map(({ value, text }, index) => (
            <li
              key={index}
              className="cursor-pointer select-none rounded-md p-2 px-4 hover:bg-secondary hover:text-primary"
              onClick={() => handleClickSortItem(value)}
            >
              {text}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
