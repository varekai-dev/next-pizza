import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'

import { Route } from '@/@types'
import { cn } from '@/shared/lib'

import { Button } from '../../ui'
import { Title } from '../title'

interface Props {
  id: string
  name: string
  price: number
  imageUrl: string
  className?: string
  ingredients?: Ingredient[]
  isPizza?: boolean
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
  isPizza = false,
}) => {
  return (
    <div className={className}>
      <Link href={`${Route.PRODUCT}/${id}`} className="flex h-full flex-col" scroll={false}>
        <div className="h=[260px] flex justify-center rounded-lg bg-secondary p-6">
          <Image
            width={215}
            height={215}
            src={imageUrl}
            alt="Logo"
            className="transition duration-300 hover:translate-y-1"
          />
        </div>
        <Title
          text={name}
          size="sm"
          className={cn('mb-1 mt-3 font-bold', {
            'flex-1': !isPizza,
          })}
        />
        {!!ingredients?.length && (
          <p className="flex flex-1 justify-start text-sm text-gray-400">
            {ingredients?.map((ingredient) => ingredient.name).join(', ')}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            {isPizza && 'from'} <b>{price} ₴</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
