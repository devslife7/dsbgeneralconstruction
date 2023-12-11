import z from "zod"
import { ReviewType } from "./review"
import { ACCEPTED_MEDIA_TYPES, MAX_FILE_SIZE } from "../constants"

export const WorkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(80, "Name must be less than 80 characters long."),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters long.")
    .max(128, "Description must be less than 128 characters long."),
  media: z
    .array(z.instanceof(File))
    .refine(files => files.every(file => file.size > 0), "Media requires to have at least one image/video.")
    .refine(files => files.every(file => file.size < MAX_FILE_SIZE, "File size must be less than 10MB."))
    .refine(
      files => files.every(file => ACCEPTED_MEDIA_TYPES.includes(file.type)),
      "Only these types are allowed .jpg, .jpeg, .png .webp .gif .mp4 .mov .webm"
    ),
})

// const longString = z.string().refine(
//   (val) => val.length > 10,
//   (val) => ({ message: `${val} is not more than 10 characters` })
// );

export type WorkFormType = z.infer<typeof WorkSchema>

export type WorkType = {
  id: number
  title: string
  description: string
  media: string[]
  rating: number
  Review: ReviewType[]
}

export type WorkErrors = {
  media?: string
  title?: string
  description?: string
}
