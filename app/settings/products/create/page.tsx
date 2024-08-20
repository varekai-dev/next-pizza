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
    <div className="overflow-auto flex justify-center gap-10 items-center w-full h-full">
      {createItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className="border border-white flex items-center flex-col p-2 rounded-md w-[300px] h-[350px] text-center relative hover:shadow-md hover:-translate-y-1 bg-white select-none overflow-hidden cursor-pointer gap-5 transition duration-300"
        >
          <Title text={item.name} className="font-bold" />
          <Image className="opacity-70" src={item.imageUrl} alt={item.name} width={200} height={200} />
        </Link>
      ))}
    </div>
  )
}
