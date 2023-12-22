import { z } from "zod"

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must contain at least 3 characters" })
    .max(20),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }).max(50)
})

export type ContactFormTypes = z.infer<typeof ContactFormSchema>
