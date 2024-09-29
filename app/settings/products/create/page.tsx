import Image from 'next/image'
import Link from 'next/link'

import { Route } from '@/@types'
import { Title } from '@/shared/components/shared'

const createItems = [
  {
    name: 'Pizza',
    description: 'Create a new pizza',
    imageUrl: '/assets/images/pizza.jpg',
    href: Route.CREATE_PIZZA,
  },
  {
    name: 'Product',
    description: 'Create a new product',
    imageUrl: '/assets/images/food.jpg',
    href: Route.CREATE_PRODUCT,
  },
]

export default function ProductCreatePage() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-10 overflow-auto">
      {createItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="relative flex h-[350px] w-[300px] cursor-pointer select-none flex-col items-center gap-5 overflow-hidden rounded-md border border-white bg-white p-2 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <Title text={item.name} className="font-bold" />
          <Image className="opacity-70" src={item.imageUrl} alt={item.name} width={200} height={200} />
        </Link>
      ))}
    </div>
  )
}
