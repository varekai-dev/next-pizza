import { notFound } from 'next/navigation'

import { prisma } from '@/prisma/prisma-client'
import { Container, ProductForm } from '@/shared/components/shared'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: String(id) },
    include: {
      ingredients: true,
      items: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      category: {
        include: {
          products: {
            include: { items: true },
          },
        },
      },
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="flex flex-col my-10 px-0">
      <ProductForm product={product} productPage />
    </Container>
  )
}
