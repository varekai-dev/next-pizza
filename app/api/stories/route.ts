import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
import { utapi } from '@/shared/services/uploadthing'

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  })

  return NextResponse.json(stories)
}

export async function POST(req: NextRequest) {
  try {
    CheckAuth('ADMIN')
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

    const story = await prisma.story.create({
      data: {
        previewImageUrl: response.data.url,
      },
    })

    return NextResponse.json(story)
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
