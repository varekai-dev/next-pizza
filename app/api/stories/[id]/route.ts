import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
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
    CheckAuth('ADMIN')

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

    const fileNames = urls.map((url) => url.split('/').pop() || '')

    await utapi.deleteFiles(fileNames)

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    CheckAuth('ADMIN')

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

    const formData = await req.formData()

    const file = formData.get('file')

    const response = await utapi.uploadFiles(file as File)

    if (!response?.data?.url) {
      return NextResponse.json(
        {
          message: 'Upload failed',
        },
        { status: 500 },
      )
    }

    const updatedStory = await prisma.story.update({
      where: {
        id,
      },
      data: {
        previewImageUrl: response.data.url,
      },
      include: {
        items: true,
      },
    })

    await utapi.deleteFiles(findStory.previewImageUrl.split('/').pop() || '')

    return NextResponse.json(updatedStory)
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
