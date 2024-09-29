'use client'

import React from 'react'

import { useElasticTransition } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'

export type Variant = {
  name: string
  value: string
  disabled?: boolean
}

interface Props {
  items: readonly Variant[]
  defaultValue?: string
  onClick?: (value: Variant['value']) => void
  className?: string
  value?: Variant['value']
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, className, value }) => {
  const { refs, activeWidth, activeOffset } = useElasticTransition({
    activeEl: value || '',
    items: [...items],
    findBy: 'value',
  })
  return (
    <div className={cn(className, 'relative flex select-none justify-between rounded-3xl bg-[#F3F3F7] p-1')}>
      {items.map((item, index) => (
        <button
          ref={(el) => {
            refs.current[index] = el
          }}
          key={item.name}
          onClick={() => !item.disabled && onClick?.(item.value)}
          className={cn(
            'duration-400 z-10 flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 text-sm transition-all',
            {
              'cursor-not-allowed text-gray-500 opacity-50': item.disabled,
            },
          )}
        >
          {item.name}
        </button>
      ))}
      <div
        className="absolute h-[30px] rounded-2xl bg-white shadow-md shadow-gray-200 transition duration-300"
        style={{
          width: `${activeWidth}px`,
          transform: `translateX(${activeOffset}px)`,
        }}
      />
    </div>
  )
}
