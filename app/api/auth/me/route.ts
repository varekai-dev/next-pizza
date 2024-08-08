import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from '@/shared/lib/get-user-session'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getUserSession()

    if (!user) {
      return NextResponse.json({ message: '[USER_GET] Unauthorized' }, { status: 401 })
    }

    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        fullName: true,
        email: true,
        phone: true,
        password: false,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 })
  }
}
