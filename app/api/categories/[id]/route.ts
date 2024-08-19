import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'

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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    CheckAuth('ADMIN')
    const { id } = params

    const findCategory = await prisma.category.findFirst({
      where: {
        id,
      },
      include: {
        products: true,
      },
    })

    if (!findCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // do not allow to delete category if it has products
    if (findCategory?.products.length) {
      return NextResponse.json({ error: 'Category has products' }, { status: 400 })
    }

    await prisma.category.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ message: 'Category deleted' })
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
