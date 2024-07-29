import {
    Container,
    Filters,
    Products,
    ProductsGroupList,
    Title,
    TopBar,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
    const categories = await prisma.category.findMany({
        where: {
            products: {
                some: {},
            },
        },
        include: {
            products: {
                include: {
                    items: true,
                    ingredients: true,
                },
            },
        },
    })
    return (
        <>
            <Container className="mt-10">
                <Title
                    text="All pizza's"
                    size="lg"
                    className="font-extrabold"
                />
            </Container>
            <TopBar categories={categories} />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Filters */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Products */}
                    <Products categories={categories} />
                </div>
            </Container>
        </>
    )
}
