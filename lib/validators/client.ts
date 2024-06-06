"use client"
import { FileType } from "lucide-react"
import { z } from "zod"

export type AddWorkSchemaClientType = z.infer<typeof AddWorkClientSchema>

export const AddWorkClientSchema = z.object({
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
  files: z.any()
  // .unknown()
  // .transform(files => files as FileList)
  // .refine(files => files.length > 0, "Media files are required.")
  // .refine(files => files.length <= 15, "Media must be less than 15 files.")
  // .refine(
  //   files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
  //   `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB) `
  // )
  // .refine(
  //   files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
  //   `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
  // )
})

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
// const MAX_FILE_SIZE = 10_000_000 // 10MB
const MAX_FILE_SIZE = 100_000 // 10MB

// export const AddWorkSchema

export const FileArraySchema = z
  .array(z.instanceof(File))
  .max(3, "Media files must be less than 15 files.")
  .refine(files => files.every(file => file.size > 1), "Media requires to have at least one image/video.")
  .refine(
    files => files.every(file => file.size < MAX_FILE_SIZE),
    `Media must be less than ${MAX_FILE_SIZE / 1000000} Megabytes.`
  )
  .refine(
    files => files.every(file => ACCEPTED_FILES_TYPES.includes(file.type)),
    `Allowed file extentions: ${ACCEPTED_FILES_TYPES.join(", ")}.`
  )
