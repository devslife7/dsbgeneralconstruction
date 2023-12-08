import z from "zod"
import { ReviewSchema } from "./review"

export const WorkSchema = z.object({
  title: z.string().trim().min(1, "Title field is required."),
  description: z.string().min(1, "Description field is required."),
  media: z
    .string({
      required_error: "Media field is required.",
    })
    .array(),
  rating: z.number(),
  Review: z.array(ReviewSchema),
})

export type WorkType = z.infer<typeof WorkSchema>
