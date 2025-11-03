import * as z from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
