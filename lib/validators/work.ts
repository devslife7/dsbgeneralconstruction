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
    .max(15, "Media files must be less than 15 files.")
    .refine(files => files.every(file => file.size > 0), "Media requires to have at least one image/video.")
    .refine(
      files => files.every(file => file.size < MAX_FILE_SIZE),
      `Media must be less than ${MAX_FILE_SIZE / 1000000} Megabytes.`
    )
    .refine(
      files => files.every(file => ACCEPTED_MEDIA_TYPES.includes(file.type)),
      "Allowed file extentions: .jpg, .jpeg, .png .webp .gif .mp4 .mov .webm"
    )
})

export const EditWorkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(80, "Name must be less than 80 characters long."),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters long.")
    .max(128, "Description must be less than 128 characters long.")
})

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
