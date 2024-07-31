import {
    Container,
    Filters,
    Products,
    Title,
    TopBar,
} from '@/shared/components/shared'
import { Suspense } from 'react'
import { findPizzas } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams
}) {
    const categories = await findPizzas(searchParams)

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
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>
                    {/* Products */}
                    <Products categories={categories} />
                </div>
            </Container>
        </>
    )
}
