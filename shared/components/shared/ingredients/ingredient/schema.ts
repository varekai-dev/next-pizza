import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  price: z.string().min(0, { message: 'Price must be greater than 0' }),
  imageUrl: z.string(),
})

export type FormIngredientValues = z.infer<typeof ingredientSchema>
