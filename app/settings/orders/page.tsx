import { redirect } from 'next/navigation'

import { Orders, Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function OrdersPage() {
  const session = await getUserSession()
  if (!session) {
    return redirect('/not-auth')
  }

  return (
    <div className="scrollbar w-full overflow-x-auto">
      <Title text="Orders" size="md" className="mb-5 font-bold" />
      <Orders />
    </div>
  )
}
