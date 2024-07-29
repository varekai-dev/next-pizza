import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
    imageUrl: string
    name: string
    className?: string
    ingredients: any[]
    items?: any[]
    onClickAdd?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    onClickAdd,
    className,
}) => {
    const textDetails = '30 cm, traditional 30'
    const totalPrice = 590
    const size = 30
    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage size={size} src={imageUrl} alt={name} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} />
                <p className="text-gray-400">{textDetails}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to Cart {totalPrice} UAH
                </Button>
            </div>
        </div>
    )
}
