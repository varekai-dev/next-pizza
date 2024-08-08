import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/prisma-client'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const product = await prisma.story.findFirst({
    where: {
      id,
    },
    include: { items: true },
  })

  if (!product) {
    return NextResponse.json({ message: 'not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
