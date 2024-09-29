import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { SettingsStories, Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function StoriesPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }

  return (
    <div className="w-full">
      <Title text="Stories" size="md" className="mb-5 font-bold" />
      <div className="flex items-center gap-2">
        <SettingsStories />
      </div>
    </div>
  )
}
