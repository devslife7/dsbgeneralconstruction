"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../lib/db"

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

export async function createReview(data: any, workId: number) {
  const created = await prisma.review.create({
    data: {
      ...data,
      workId: workId
    }
  })

  const rating = await prisma.review.aggregate({ _avg: { rating: true }, where: { workId } })
  await prisma.work.update({
    where: { id: workId },
    data: { rating: rating._avg.rating }
  })

  return created
}
