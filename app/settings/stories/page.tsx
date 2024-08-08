import Link from 'next/link'
import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

import { SettingsStories, Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function StoriesPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }

  return (
    <div className="w-full overflow-x-auto scrollbar">
      <Title text="Stories" size="md" className="font-bold mb-10" />
      <SettingsStories />
      <Link href="/settings/stories/create">
        <Button variant="secondary" size="lg" className="text-lg">
          Create story
        </Button>
      </Link>
      {/* <UploadStories /> */}
    </div>
  )
}
