'use client'

import { useSession } from 'next-auth/react'
import { UserRole } from '@prisma/client'

export const useRole = (): Record<string, boolean> => {
  const { data: session } = useSession()

  const isAdmin = session?.user.role === UserRole.ADMIN

  const isUser = session?.user.role === UserRole.USER

  return { isAdmin, isUser, isLoading: !session }
}
