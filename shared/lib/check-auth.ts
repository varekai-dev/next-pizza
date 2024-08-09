import { NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'

import { getUserSession } from './get-user-session'

export const CheckAuth = async (userRole: keyof typeof UserRole | Array<keyof typeof UserRole>) => {
  'use server'

  try {
    const user = await getUserSession()

    const roleArray = typeof userRole === 'string' ? [userRole] : userRole

    if (roleArray.includes(user?.role as keyof typeof UserRole)) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 403 },
      )
    }
  } catch (error) {
    console.log('[CHECK_AUTH] Server error', error)
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
