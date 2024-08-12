import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()

    const findCategory = await prisma.category.findFirst({
      where: {
        id,
      },
    })

    if (!findCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: body.name,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
