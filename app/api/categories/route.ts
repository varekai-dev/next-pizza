import { NextRequest, NextResponse } from 'next/server'
import queryString from 'qs'
import { Prisma } from '@prisma/client'

import { prisma } from '@/prisma/prisma-client'
import { convertObjectTypes } from '@/shared/lib'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const parsedSearchParams = queryString.parse(searchParams.toString())

    const categories = await prisma.category.findMany(
      convertObjectTypes(parsedSearchParams) as Prisma.CategoryFindManyArgs,
    )
    return NextResponse.json(categories)
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
