import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { SettingProducts, Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function ProductsPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }
  return (
    <div className="overflow-auto">
      <Title text="Products" size="md" className="mb-5 font-bold" />
      <SettingProducts />
    </div>
  )
}
