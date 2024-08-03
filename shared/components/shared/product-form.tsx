'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import { useCartStore } from '@/shared/store'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

interface Props {
    product: ProductWithRelations
    onSubmit?: () => void
    isDrawer?: boolean
}

export const ProductForm: React.FC<Props> = ({
    product,
    onSubmit: _onSubmit,
    isDrawer = false,
}) => {
    const [addCartItem, loading] = useCartStore(state => [
        state.addCartItem,
        state.loading,
    ])
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
