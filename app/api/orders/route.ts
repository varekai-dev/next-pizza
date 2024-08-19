import { NextResponse } from 'next/server'
import { Prisma, UserRole } from '@prisma/client'

import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib/get-user-session'

export async function GET() {
  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      )
    }

    const searchParams = {
      orderBy: {
        createdAt: 'desc',
      },
      ...(user.role !== UserRole.ADMIN && {
        where: {
          userId: user.id,
        },
      }),
    }

    const orders = await prisma.order.findMany(searchParams as Prisma.OrderFindManyArgs)

    return NextResponse.json(orders)
  } catch (error) {
    console.log('[ORDERS_GET] Server error', error)
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
