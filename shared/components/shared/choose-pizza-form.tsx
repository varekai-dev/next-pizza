import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants'
import { Ingredient, ProductItem } from '@prisma/client'
import { IngredientItem } from './ingredient-item'
import { usePizzaOptions } from '@/shared/hooks'
import { getPizzaDetails } from '@/shared/lib/get-pizza-details'

interface Props {
    imageUrl: string
    name: string
    className?: string
    ingredients: Ingredient[]
    items: ProductItem[]
    onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className,
}) => {
    const {
        size,
        type,
        availablePizzaSizes,
        setSize,
        setType,
        selectedIngredients,
        addIngredient,
    } = usePizzaOptions(items)

    const { totalPrice, textDetails } = getPizzaDetails({
        size,
        type,
        ingredients,
        items,
        selectedIngredients,
    })

    const handleClickAddCart = () => {
        onClickAddCart?.()
        console.log({ size, type, selectedIngredients })
    }

    return (
        <div className={cn(className, 'flex flex-1 rounded')}>
            <ProductImage size={size} src={imageUrl} alt={name} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} />
                <p className="text-gray-400">{textDetails}</p>
                <div className="flex flex-col gap-4 mt-4">
                    <GroupVariants
                        items={availablePizzaSizes}
                        value={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map(ingredient => {
                            return (
                                <IngredientItem
                                    price={ingredient.price}
                                    key={ingredient.id}
                                    name={ingredient.name}
                                    imageUrl={ingredient.imageUrl}
                                    active={selectedIngredients.has(
                                        ingredient.id
                                    )}
                                    onClick={() => addIngredient(ingredient.id)}
                                />
                            )
                        })}
                    </div>
                </div>
                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={handleClickAddCart}
                >
                    Add to Cart {totalPrice} ₴
                </Button>
            </div>
        </div>
    )
}
