import { prisma } from '@/prisma/prisma-client'
import { SingleStory } from '@/shared/components/shared'

import { getUserSession } from '@/shared/lib/get-user-session'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function StoryPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const session = await getUserSession()
    if (session?.role !== UserRole.ADMIN) {
        return redirect('/not-auth')
    }
    const story = await prisma.story.findUnique({
        where: {
            id,
        },
        include: {
            items: true,
        },
    })

    if (!story) {
        return redirect('/')
    }

    return <SingleStory story={story} />
}
