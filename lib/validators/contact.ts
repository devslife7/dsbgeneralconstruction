import { z } from "zod"

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must contain at least 3 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
})

export type ContactFormTypes = z.infer<typeof ContactFormSchema>
