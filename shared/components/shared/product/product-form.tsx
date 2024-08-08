'use client'

import React from 'react'
import toast from 'react-hot-toast'

import { ProductWithRelations } from '@/@types/prisma'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import { useCartStore } from '@/shared/store'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { ChooseProductForm } from '../choose-product-form'

interface Props {
  product: ProductWithRelations
  onSubmit?: () => void
  isDrawer?: boolean
  productPage?: boolean
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
  isDrawer = false,
  productPage = false,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const onSubmit = async (values: CreateCartItemValues) => {
    try {
      await addCartItem(values)
      toast.success(`${product.name} added to cart`)
      _onSubmit?.()
    } catch (error) {
      toast.error('Could not add item to cart')
      console.log(error)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        productPage={productPage}
        isDrawer={isDrawer}
        onClickAdd={onSubmit}
        name={product.name}
        items={product.items}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      productPage={productPage}
      isDrawer={isDrawer}
      price={product.items[0].price}
      productItemId={product.items[0].id}
      onClickAdd={onSubmit}
      name={product.name}
      imageUrl={product.imageUrl}
      loading={loading}
    />
  )
}
