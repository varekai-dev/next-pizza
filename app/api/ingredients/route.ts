import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../prisma/prisma-client'

import { uploadImage } from '@/app/action'
import { CheckAuth } from '@/shared/lib/check-auth'

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

    const response = await uploadImage(file as File)

    const ingredient = await prisma.ingredient.create({
      data: {
        price: Number(price),
        name: name as string,
        imageUrl: response.data?.url || '',
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
