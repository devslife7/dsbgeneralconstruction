import { z } from "zod"

export const reviewSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 character(s)"),
  comment: z.string().min(3, "Comment must contain at least 3 character(s)"),
  rating: z.number().min(1, "Missing star rating").max(5),
  workId: z.number()
})

export type ReviewFormType = z.infer<typeof reviewSchema>

export type ReviewType = {
  id: number
  name: string
  comment: string
  rating: number
  workId: number
}

export type ReviewErrors = {
  name?: string
  comment?: string
  rating?: string
}
