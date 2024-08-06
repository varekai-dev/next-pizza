import {
    CartButtonFixed,
    Container,
    Filters,
    Products,
    Title,
    TopBar,
} from '@/shared/components/shared'
import { findPizzas } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-pizzas'
import React from 'react'

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams
}) {
    const categories = await findPizzas(searchParams)

    return (
        <>
            <Container className="mt-10">
                <Title text="Categories" size="lg" className="font-extrabold" />
            </Container>
            <TopBar categories={categories} searchParams={searchParams} />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px] relative">
                    {/* Filters */}
                    <div className="w-[250px] lg:block hidden">
                        <React.Suspense>
                            <Filters />
                        </React.Suspense>
                    </div>
                    {/* Products */}
                    <Products categories={categories} />
                    <CartButtonFixed />
                </div>
            </Container>
        </>
    )
}
