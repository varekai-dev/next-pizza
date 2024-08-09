import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'

import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib/get-user-session'
import { utapi } from '@/shared/services/uploadthing'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const product = await prisma.story.findFirst({
    where: {
      id,
    },
    include: { items: true },
  })

  if (!product) {
    return NextResponse.json({ message: 'not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserSession()
    if (user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 403 },
      )
    }
    const { id } = params

    const findStory = await prisma.story.findFirst({
      where: {
        id,
      },
      include: {
        items: true,
      },
    })

    if (!findStory) {
      return NextResponse.json(
        {
          message: 'Not found',
        },
        { status: 404 },
      )
    }

    const itemsUrls = findStory?.items.map((item) => item.sourceUrl)

    const urls = [...itemsUrls, findStory?.previewImageUrl]

    await prisma.story.delete({
      where: {
        id,
      },
    })

    await utapi.deleteFiles(urls)

    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.log('[STORY_DELETE] Server error', error)
    return NextResponse.json(
      {
        message: 'Server error',
      },
      {
        status: 500,
      },
    )
  }
}
