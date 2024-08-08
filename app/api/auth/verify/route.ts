import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

export async function POST(request: NextRequest) {
  const data = await request.json()
  if (!data.code) {
    return NextResponse.json({ message: 'No code' }, { status: 400 })
  }
  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code: data.code,
    },
  })

  if (!verificationCode) {
    return NextResponse.json({ message: 'Invalid code' }, { status: 400 })
  }

  await prisma.user.updateMany({
    where: {
      id: verificationCode.userId,
    },
    data: {
      verified: new Date(),
    },
  })

  await prisma.verificationCode.delete({
    where: {
      id: verificationCode.id,
    },
  })

  return NextResponse.json({ message: 'Email verified' })
}
