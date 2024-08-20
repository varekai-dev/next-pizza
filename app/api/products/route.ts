import { NextRequest, NextResponse } from 'next/server'
import QueryString from 'qs'

import { prisma } from '@/prisma/prisma-client'
import { CheckAuth } from '@/shared/lib/check-auth'

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.nextUrl.searchParams)

    const parsed = QueryString.parse(searchParams.toString())

    const includeParsed = Array.isArray(parsed.include)
      ? parsed.include?.reduce(
          (acc, item) => {
            acc[item as string] = true
            return acc
          },
          {} as Record<string, boolean>,
        )
      : {}

    const products = await prisma.product.findMany({
      include: includeParsed,
    })
    return NextResponse.json(products)
  } catch (error) {
    console.log('[PRODUCTS_GET] Server error', error)
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

export async function POST() {
  try {
    CheckAuth('ADMIN')

    // const formData = await req.formData()

    // const file = formData.get('file')

    // const productData = {} as Product

    // formData.forEach((value, key) => {
    //   productData[key] = value
    // })

    // const response = await uploadImage(file as File)

    // const product = await prisma.product.create({
    //   data,
    // })

    return NextResponse.json('')
  } catch (error) {
    console.log('[PRODUCTS_POST] Server error', error)
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
