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
    <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none relative')}>
      {items.map((item, index) => (
        <button
          ref={(el) => {
            refs.current[index] = el
          }}
          key={item.name}
          onClick={() => !item.disabled && onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm z-10',
            {
              'text-gray-500 opacity-50 cursor-not-allowed': item.disabled,
            },
          )}
        >
          {item.name}
        </button>
      ))}
      <div
        className="shadow-md shadow-gray-200 absolute bg-white h-[30px] rounded-2xl transition duration-300"
        style={{
          width: `${activeWidth}px`,
          transform: `translateX(${activeOffset}px)`,
        }}
      />
    </div>
  )
}
