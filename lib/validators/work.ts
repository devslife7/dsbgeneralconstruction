import z from "zod"
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../constants"
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

export type AddWorkType = z.infer<typeof AddWorkSchema>

const ACCEPTED_FILES_TYPES: [string, ...string[]] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/quicktime",
  "video/webm"
]

export const AddWorkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters longdd.")
    .min(4, "Title must be at least 4 characters long.")
    .max(80, "Name must be less than 80 characters long."),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters long.")
    .max(128, "Description must be less than 128 characters long."),
  files: z
    .unknown()
    .transform(files => files as FileList)
    .refine(files => files.length > 0, "Media files are required.")
    .refine(files => files.length <= 15, "Media must be less than 15 files.")
    .refine(
      files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
      `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB)`
    )
    .refine(
      files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
      `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
    )
  // files: z
  //   .array(
  //     z.object({
  //       type: z.string(),
  //       name: z.string(),
  //       size: z.number()
  //     })
  //   )
  //   .min(1, "Media files are required.")
  // .transform(files => files as FileList)
  // .refine(files => files.length > 0, "Media files are required.")
  // .refine(files => files.length <= 15, "Media must be less than 15 files.")
  // .refine(
  //   files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
  //   `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB)`
  // )
  // .refine(
  //   files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
  //   `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
  // )
  // files: z
  //   .unknown()
  //   .transform(files => files as FileList)
  //   .refine(files => files.length > 0, "Media files are required.")
  //   .refine(files => files.length <= 15, "Media must be less than 15 files.")
  //   .refine(
  //     files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
  //     `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB)`
  //   )
  //   .refine(
  //     files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
  //     `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
  //   )
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

export const EditWorkSchemaServer = z.object({
  id: z.number(),
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

export type WorkType = {
  id: number
  title: string
  description: string
  files: string[]
  Reviews: ReviewType[]
  ratingCount: number
  ratingAvg: number
}
