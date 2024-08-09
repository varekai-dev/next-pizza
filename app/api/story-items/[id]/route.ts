import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
import { utapi } from '@/shared/services/uploadthing'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    CheckAuth('ADMIN')

    const { id } = params

    const findItem = await prisma.storyItem.findFirst({
      where: {
        id,
      },
    })

    if (!findItem) {
      return NextResponse.json(
        {
          message: 'Not found',
        },
        { status: 404 },
      )
    }

    await prisma.storyItem.delete({
      where: {
        id,
      },
    })

    await utapi.deleteFiles(findItem.sourceUrl.split('/').pop() || '')

    return NextResponse.json(findItem)
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

    const findItem = await prisma.storyItem.findFirst({
      where: {
        id,
      },
    })

    if (!findItem) {
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

    const updatedStoryItem = await prisma.storyItem.update({
      where: {
        id,
      },
      data: {
        sourceUrl: response.data.url,
      },
    })

    await utapi.deleteFiles(findItem.sourceUrl.split('/').pop() || '')

    return NextResponse.json(updatedStoryItem)
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
