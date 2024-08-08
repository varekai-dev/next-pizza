import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function DashboardPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }
  return (
    <div>
      <Title text="Dashboard" size="md" className="font-bold" />
    </div>
  )
}
