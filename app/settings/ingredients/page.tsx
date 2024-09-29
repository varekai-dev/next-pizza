import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { Ingredients, Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function IngredientsPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }

  return (
    <div className="overflow-auto">
      <Title text="Ingredients" size="md" className="mb-5 font-bold" />
      <Ingredients />
    </div>
  )
}
