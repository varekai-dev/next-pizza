import { notFound } from 'next/navigation'

import { prisma } from '@/prisma/prisma-client'
import { Product } from '@/shared/components/shared'

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: String(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  })

  if (!product) {
    return notFound()
  }
  return <Product product={product} />
}
