import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { QueryKey } from '@/@types'
import { CartButtonFixed, Container, Filters, Products, Stories, TopBar } from '@/shared/components/shared'
import { Api } from '@/shared/services/api-client'
import { GetSearchParams } from '@/shared/services/categories'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GET_CATEGORIES, String(JSON.stringify(searchParams))],
    queryFn: () => Api.categories.getAll({ params: searchParams }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopBar searchParams={searchParams} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="relative flex gap-[60px]">
          {/* Filters */}
          <div className="hidden w-[250px] lg:block">
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
