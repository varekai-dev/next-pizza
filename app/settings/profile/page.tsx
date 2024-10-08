import { redirect } from 'next/navigation'

import { prisma } from '@/prisma/prisma-client'
import { Profile } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-auth')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.id,
    },
  })

  if (!user) {
    return redirect('/not-auth')
  }

  return <Profile data={user} />
}
