'use client'

import React from 'react'
import { Product } from '@prisma/client'

import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { ImageCard } from '../image-card'
import { Title } from '../title'
import { Tooltip } from '../tooltip'

interface Props {
  className?: string
  name: string
  id: string
  products?: Product[]
}

export const CategoryItem: React.FC<Props> = ({ className, name, products }) => {
  const [width, setWidth] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  const itemCount = Number((width / 100).toFixed(0))

  const isSliced = products?.length || 0 > itemCount

  const sliceProducts = isSliced ? products?.slice(0, itemCount) : products

  return (
    <div className={cn('bg-white rounded-md px-4 py-3 flex justify-between items-center gap-3', className)}>
      <Title text={name} size="xs" className="font-bold" />
      <div ref={ref} className="flex gap-3 flex-1">
        {sliceProducts?.map((product) => (
          <Tooltip content={product.name} key={product.id}>
            <ImageCard srcUrl={product.imageUrl} alt={product.name} width={40} height={40} />
          </Tooltip>
        ))}
        {isSliced && (
          <div className="flex items-center justify-center font-bold">+{products?.length || 0 - itemCount}</div>
        )}
      </div>

      <Button variant="outline">Edit</Button>
    </div>
  )
}
