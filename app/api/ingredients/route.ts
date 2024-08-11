import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'

import { CheckAuth } from '@/shared/lib/check-auth'
import { utapi } from '@/shared/services/uploadthing'

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany()
    return NextResponse.json(ingredients)
  } catch (error) {
    console.log('[INGREDIENTS_GET] Server error', error)
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

export async function POST(req: NextRequest) {
  try {
    CheckAuth('ADMIN')

    const formData = await req.formData()

    const file = formData.get('file')
    const price = formData.get('price')
    const name = formData.get('name')

    const response = await utapi.uploadFiles(file as File)

    if (!response?.data?.url) {
      return NextResponse.json(
        {
          message: 'Upload failed',
        },
        { status: 500 },
      )
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        price: Number(price),
        name: name as string,
        imageUrl: response.data.url,
      },
    })

    return NextResponse.json(ingredient)
  } catch (error) {
    console.log('[INGREDIENT_POST] Server error', error)
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
