"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "../lib/db"
import { ReviewSchema } from "@/lib/validators/review"

export async function deleteReview(reviewId: number) {
  const deleted = await prisma.review.delete({
    where: {
      id: reviewId
    }
  })

  const workId = deleted.workId
  updateWorkReviewAverage(workId)
  revalidatePath("/work")
  return deleted
}

export async function addReview(data: unknown) {
  const parsedData = ReviewSchema.safeParse(data)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }
  const workId = parsedData.data.workId as number
  const work = prisma.review.findUnique({
    where: {
      id: workId
    }
  })

  if (!work) return { status: 404, message: "Work not found" }

  try {
    await prisma.review.create({ data: parsedData.data })
    await updateWorkReviewAverage(workId)
    revalidatePath("/work")
    return { status: 200, message: "Successfully added Review" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Review" }
  }
}

const updateWorkReviewAverage = async (workId: number) => {
  const ratingAggregate = await prisma.review.aggregate({
    _avg: { rating: true },
    where: { workId },
    _count: { rating: true }
  })

  const ratingAvg = ratingAggregate._avg.rating ? ratingAggregate._avg.rating : 0
  const ratingCount = ratingAggregate._count.rating

  await prisma.work.update({
    where: { id: workId },
    data: { ratingAvg, ratingCount: ratingCount }
  })
}
