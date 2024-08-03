import { Container, ProductForm } from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
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
