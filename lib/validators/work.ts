import z from "zod"
import { ReviewSchema } from "./review"

export const WorkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(80, "Name must be less than 80 characters long."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long.")
    .max(128, "Description must be less than 128 characters long."),
  media: z
    .string({
      required_error: "Media must have at least one image/video.",
    })
    .array(),
  rating: z.number(),
  Review: z.array(ReviewSchema),
})

export type WorkType = z.infer<typeof WorkSchema>
