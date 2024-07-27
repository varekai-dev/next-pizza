import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface Props {
    className?: string
    src: string
    alt: string
    size: number
}

export const ProductImage: React.FC<Props> = ({
    className,
    src,
    alt,
    size,
}) => {
    const adaptiveSize = (() => {
        switch (size) {
            case 20:
                return 300
            case 30:
                return 400
            case 40:
                return 500
            default:
                return 300
        }
    })()
    return (
        <div
            className={cn(
                'flex items-center justify-center flex-1 relative',
                className
            )}
        >
            <Image
                className="left-2 top-2 relative transition-all z-10 duration-300"
                objectFit="contain"
                width={adaptiveSize}
                height={adaptiveSize}
                src={src}
                alt={alt}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    )
}
