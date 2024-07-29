import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { Ingredient } from '@prisma/client'

interface Props {
    id: number
    name: string
    price: number
    imageUrl: string
    className?: string
    ingredients?: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
    id,
    name,
    price,
    imageUrl,
    className,
    ingredients,
}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`} className="block">
                <div className="flex justify-center p-6 bg-secondary rounded-lg h=[260px]">
                    <Image width={215} height={215} src={imageUrl} alt="Logo" />
                </div>
                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
                <p className="text-sm text-gray-400">
                    {/* {ingredients?.join(', ')} */}
                    Pepperoni, mozzarella, tomato sauce, basil
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        from <b>{price} UAH</b>
                    </span>
                    <Button
                        variant="secondary"
                        className="text-base font-bold "
                    >
                        <Plus size={20} className="mr-1" />
                        Add
                    </Button>
                </div>
            </Link>
        </div>
    )
}
