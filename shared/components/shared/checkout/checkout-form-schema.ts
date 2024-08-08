import { z } from 'zod'

export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, 'First name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(17, 'Not valid phone number'),
  address: z.string().min(6, 'Address must be at least 6 characters'),
  comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
