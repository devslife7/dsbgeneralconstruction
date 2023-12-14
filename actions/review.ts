"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../lib/db"
import { ReviewSchemaType, reviewSchema } from "@/lib/validators/review"

export async function deleteReview(reviewId: number) {
  const deleted = await prisma.review.delete({
    where: {
      id: reviewId
    }
  })

  const workId = deleted.workId
  const ratingAggregate = await prisma.review.aggregate({ _avg: { rating: true }, where: { workId } })
  const ratingValue = ratingAggregate._avg.rating ? ratingAggregate._avg.rating : 0
  await prisma.work.update({
    where: { id: workId },
    data: { rating: ratingValue }
  })

  revalidatePath("/work")
  return deleted
}

export async function addReview(data: ReviewSchemaType) {
  const parsedData = reviewSchema.safeParse(data)
  if (!parsedData.success) {
    return
  }

  const created = await prisma.review.create({
    data: {
      ...parsedData.data,
      workId: parsedData.data.workId as number
    }
  })
  // const rating = await prisma.review.aggregate({ _avg: { rating: true }, where: { workId } })
  // await prisma.work.update({
  //   where: { id: workId },
  //   data: { rating: rating._avg.rating }
  // })
  // return created
}
