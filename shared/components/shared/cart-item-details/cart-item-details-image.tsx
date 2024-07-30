import { cn } from '@/shared/lib'
import Image from 'next/image'

interface Props {
    src: string
    className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
    return (
        <Image
            className={cn('h-[60px]', className)}
            src={src}
            width={60}
            height={60}
            alt="cart"
            objectFit="cover"
        />
    )
}