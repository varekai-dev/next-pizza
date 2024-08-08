import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { CartButtonFixed, Container, Filters, Products, Stories, Title, TopBar } from '@/shared/components/shared'
import { findCategories } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-categories'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GET_CATEGORIES, searchParams],
    queryFn: () => findCategories(searchParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="mt-10">
        <Title text="Categories" size="lg" className="font-extrabold" />
      </Container>
      <TopBar searchParams={searchParams} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px] relative">
          {/* Filters */}
          <div className="w-[250px] lg:block hidden">
            <React.Suspense>
              <Filters />
            </React.Suspense>
          </div>
          {/* Products */}
          <Products searchParams={searchParams} />
          <CartButtonFixed />
        </div>
      </Container>
    </HydrationBoundary>
  )
}
