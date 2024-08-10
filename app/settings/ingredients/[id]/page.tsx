import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { UserRole } from '@prisma/client'

import { QueryKey } from '@/@types'
import { Ingredient } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'
import { Api } from '@/shared/services/api-client'

export default async function IngredientPage({ params: { id } }: { params: { id: string } }) {
  const session = await getUserSession()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GET_INGREDIENT, id],
    queryFn: () => Api.ingredients.getIngredient(id),
  })

  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Ingredient id={id} />
    </HydrationBoundary>
  )
}
