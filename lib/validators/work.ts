import z from "zod"
import { ReviewType } from "./review"
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, ACCEPTED_FILE_TYPES_EXTENTION } from "../constants"

export type WorkType = {
  id: number
  title: string
  description: string
  files: string[]
  Reviews: ReviewType[]
  ratingCount: number
  ratingAvg: number
}

const WorkSchema = z.object({
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

const FileArraySchema = z.object({
  files: z
    .array(z.instanceof(File))
    .refine(files => files.length > 0, "Media files are required.")
    .refine(files => files.length <= 15, "Media must be less than 15 files.")
    .refine(
      files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
      `Accepted file types: ${ACCEPTED_FILE_TYPES_EXTENTION.join(", ")}.`
    )
    .refine(
      files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
      `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB)`
    )
})

export type WorkFormType = {
  onOpenChange: (open: boolean) => void
  work?: WorkType | null
}
export type WorkFormFields = {
  title: string
  description: string
  files: FileList
}
export const AddWorkSchema = WorkSchema.merge(FileArraySchema)
export const WorkSchemaServer = WorkSchema.extend({ files: z.array(z.string()) })
export const EditWorkSchema = WorkSchema.extend({ id: z.number() })
