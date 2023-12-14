import { z } from "zod"

export const reviewSchema = z.object({
  name: z.string().min(3),
  comment: z.string().min(3),
  rating: z.number().min(1).max(5),
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
