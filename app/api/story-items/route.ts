import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
import { utapi } from '@/shared/services/uploadthing'

export async function POST(req: NextRequest) {
  try {
    CheckAuth('ADMIN')
    const formData = await req.formData()
    const id = formData.get('id') as string

    if (!id) {
      return NextResponse.json(
        {
          message: 'Story id is required',
        },
        { status: 400 },
      )
    }

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
          message: 'Story not found',
        },
        { status: 404 },
      )
    }

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

    const storyItem = await prisma.storyItem.create({
      data: {
        storyId: id,
        sourceUrl: response.data.url,
      },
    })

    return NextResponse.json(storyItem)
  } catch (error) {
    console.log('[STORY_POST] Server error', error)
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
