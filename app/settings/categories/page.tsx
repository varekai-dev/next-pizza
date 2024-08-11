import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { SettingCategories, Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function CategoriesPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }
  return (
    <div className="w-full">
      <Title text="Categories" size="md" className="font-bold mb-5" />
      <SettingCategories />
    </div>
  )
}
