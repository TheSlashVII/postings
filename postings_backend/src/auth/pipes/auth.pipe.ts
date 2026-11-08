import { z } from "zod"

export const authSchema = z.object({
  email: z.email(),
  password: z.string()
})

export type AuthDto = z.infer<typeof authSchema>
