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
    <div>
      <Title text="Products" size="md" className="font-bold" />
      <SettingProducts />
    </div>
  )
}
