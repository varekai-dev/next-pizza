import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'

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
      <Link href={`/product/${id}`} className="flex flex-col h-full" scroll={false}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h=[260px]">
          <Image
            width={215}
            height={215}
            src={imageUrl}
            alt="Logo"
            className="hover:translate-y-1 transition duration-300"
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
          <p className="text-sm text-gray-400 flex-1 flex justify-start">
            {ingredients?.map((ingredient) => ingredient.name).join(', ')}
          </p>
        )}

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            {isPizza && 'from'} <b>{price} ₴</b>
          </span>
          <Button variant="secondary" className="text-base font-bold ">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
