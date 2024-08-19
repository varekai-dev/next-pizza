import { z } from 'zod'

import { passwordSchema } from '@/shared/constants'

export const formUpdateProfileSchema = z.object({
  fullName: z.string().min(2, { message: 'Enter First and Last name' }),

  phone: z.string().min(17, 'Not valid phone number'),
  email: z.string().email(),
})

export const formUpdatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormUpdateProfileValues = z.infer<typeof formUpdateProfileSchema>
export type formUpdatePasswordValues = z.infer<typeof formUpdatePasswordSchema>
