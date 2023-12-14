"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../lib/db"
import { reviewSchema } from "@/lib/validators/review"

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

export async function addReview(data: unknown) {
  const parsedData = reviewSchema.safeParse(data)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }
  const workId = parsedData.data.workId as number
  try {
    const newReview = await prisma.review.create({ data: parsedData.data })
    const rating = await prisma.review.aggregate({ _avg: { rating: true }, where: { workId } })
    await prisma.work.update({
      where: { id: workId },
      data: { rating: rating._avg.rating }
    })
    revalidatePath("/work")
    return { status: 200, message: "Successfully added Work" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Review" }
  }
}
