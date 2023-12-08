import z from "zod"

export const ReviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(80, {
      message: "Name must be less than 80 characters long",
    }),
  comment: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters long",
    })
    .max(128, {
      message: "Comment must be less than 128 characters long",
    }),
  rating: z.number(),
  workId: z.number(),
})

export type ReviewType = z.infer<typeof ReviewSchema>
