"use client"
import z from "zod"
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../constants"

export const WorkFormSchema2 = z.object({
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
  files: z
    .instanceof(FileList)
    .refine(files => files.length > 0, "Media files are required.")
    .refine(files => files.length <= 15, "Media must be less than 15 files.")
    .refine(
      files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
      `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB) `
    )
    .refine(
      files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
      `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
    )
})

export type WorkFormType2 = z.infer<typeof WorkFormSchema2>
