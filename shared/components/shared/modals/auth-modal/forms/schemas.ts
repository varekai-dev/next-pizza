import { z } from 'zod'

import { passwordSchema } from '@/shared/constants'

export const formLoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Enter First and Last name' }),
      confirmPassword: passwordSchema,
      phone: z.string().min(17, 'Not valid phone number'),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const updateProfileSchema = formRegisterSchema.optional()

export type FormLoginValues = z.infer<typeof formLoginSchema>
export type FormRegisterValues = z.infer<typeof formRegisterSchema>
