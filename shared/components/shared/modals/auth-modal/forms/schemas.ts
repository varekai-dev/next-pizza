import { z } from 'zod'

export const passwordSchema = z.string().min(4, { message: 'Min length 4' })

export const formLoginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            fullName: z
                .string()
                .min(2, { message: 'Enter First and Last name' }),
            confirmPassword: passwordSchema,
        })
    )
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type formLoginValues = z.infer<typeof formLoginSchema>
export type formRegisterValues = z.infer<typeof formRegisterSchema>
