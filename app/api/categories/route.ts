import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'
import { findCategories } from '@/shared/lib/find-categories'

export async function GET(req: NextRequest) {
  try {
    const categories = await findCategories(Object.fromEntries(req.nextUrl.searchParams))
    return NextResponse.json(categories)
  } catch (error) {
    console.log('[CATEGORIES_GET] Server error', error)
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
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json(
        {
          message: 'Name is required',
        },
        {
          status: 400,
        },
      )
    }

    const isCategoryExists = await prisma.category.findFirst({
      where: {
        name,
      },
    })

    if (isCategoryExists) {
      return NextResponse.json(
        {
          message: 'Category already exists',
        },
        {
          status: 400,
        },
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(category, {
      status: 201,
    })
  } catch (error) {
    console.log('[CATEGORIES_POST] Server error', error)
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
