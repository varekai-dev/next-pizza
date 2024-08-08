import { prisma } from '@/prisma/prisma-client'

export const findOrCreateCart = async (token: string, userId?: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        { token },
        {
          userId,
        },
      ],
    },
  })

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    })
  }

  return userCart
}
