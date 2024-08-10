import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
import { utapi } from '@/shared/services/uploadthing'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id: String(id),
      },
    })

    if (!ingredient) {
      return NextResponse.json(
        { message: 'Ingredient not found' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(ingredient)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
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

    const findIngredient = await prisma.ingredient.findFirst({
      where: {
        id,
      },
    })

    if (!findIngredient) {
      return NextResponse.json(
        {
          message: 'Not found',
        },
        { status: 404 },
      )
    }

    const formData = await req.formData()

    const file = formData.get('file')
    const name = formData.get('name')
    const price = formData.get('price')

    let imageUrl

    if (file) {
      const response = await utapi.uploadFiles(file as File)

      if (!response?.data?.url) {
        return NextResponse.json(
          {
            message: 'Upload failed',
          },
          { status: 500 },
        )
      }
      imageUrl = response.data.url
    }

    const updatedIngredient = await prisma.ingredient.update({
      where: {
        id,
      },
      data: {
        ...(imageUrl && { imageUrl }),
        ...(name && { name: name as string }),
        ...(price && { price: Number(price) }),
        price: Number(price),
      },
    })

    await utapi.deleteFiles(findIngredient.imageUrl.split('/').pop() || '')

    return NextResponse.json(updatedIngredient)
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
