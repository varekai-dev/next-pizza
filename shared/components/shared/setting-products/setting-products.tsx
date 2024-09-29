'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { QueryKey, Route } from '@/@types'
import { ProductWithRelations } from '@/@types/prisma'
import { useGetProducts } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Button, Skeleton } from '../../ui'
import { AddButton } from '../add-button'
import { IngredientItem } from '../ingredient-item'

interface Props {
  className?: string
}

export const SettingProducts: React.FC<Props> = ({ className }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { products, isLoading } = useGetProducts({
    params: {
      include: ['items'],
    },
  })

  const handleClickProduct = (product: ProductWithRelations) => {
    router.push(`${Route.PRODUCTS}/${product.id}`)
    queryClient.setQueryData([QueryKey.GET_PRODUCT, product.id], () => product)
  }
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-[150px] bg-gray-200" />
        ))
      ) : (
        <>
          {products?.map((product) => (
            <IngredientItem
              key={product.id}
              className="h-[200px] w-[150px]"
              imageUrl={product.imageUrl}
              name={product.name}
              price={Math.min(...product.items.map((item) => item.price))}
              // onDelete={() => deleteIngredient(ingredient.id)}
              onClick={() => handleClickProduct(product)}
            />
          ))}
          <div className="flex h-[200px] w-[150px] items-center justify-center">
            <Button
              variant="link"
              size="lg"
              className="text-lg text-gray-500"
              onClick={() => router.push(Route.CREATE_PRODUCT)}
            >
              <AddButton />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
