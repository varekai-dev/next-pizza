import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { CartButtonFixed, Container, Filters, Products, Stories, TopBar } from '@/shared/components/shared'
import { findCategories } from '@/shared/lib/find-categories'
import { GetSearchParams } from '@/shared/services/categories'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GET_CATEGORIES, String(JSON.stringify(searchParams))],
    queryFn: () => findCategories(searchParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopBar searchParams={searchParams} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="relative flex gap-[60px]">
          {/* Filters */}
          <div className="scrollbar sticky top-28 hidden max-h-[calc(100vh-11rem)] w-[250px] shrink-0 self-start overflow-y-auto pr-2 lg:block">
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
