import z from "zod"
import { ReviewType } from "./review"

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
  files: z.array(z.string())
})

// export const WorkFormSchema = z.object({
//   title: z
//     .string()
//     .trim()
//     .min(3, "Title must be at least 3 characters long.")
//     .max(80, "Name must be less than 80 characters long."),
//   description: z
//     .string()
//     .trim()
//     .min(3, "Description must be at least 3 characters long.")
//     .max(128, "Description must be less than 128 characters long."),
//   files: z
//     .instanceof(FileList)
//     .refine(files => files.length > 0, "sMedia files are required.")
//     .refine(files => files.length <= 15, "Media must be less than 15 files.")
//     .refine(
//       files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
//       `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB) `
//     )
//     .refine(
//       files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
//       `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
//     )
// })

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

// export type WorkFormType = z.infer<typeof WorkFormSchema>
// export type WorkType = z.infer<typeof WorkSchema>

export type WorkType = {
  id: number
  title: string
  description: string
  files: string[]
  rating: number
  Review: ReviewType[]
}
