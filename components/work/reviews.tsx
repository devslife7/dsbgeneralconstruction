"use client"
import { deleteReview } from "@/actions/review"
import { DeleteSVG, StarFilledSVG } from "@/public/svgs"
import { useState } from "react"
import ReviewForm from "./forms/ReviewForm"
import Button from "../ui/button"

export default function ReviewList({ reviews, workId }: { reviews: any; workId: number }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  const closeReviewForm = () => setIsReviewFormOpen(false)
  const toggleReviewForm = () => {
    setIsReviewFormOpen(prevState => !prevState)
  }

  const removeReview = async (reviewId: number) => {
    confirm("Are you sure you want to delete this review?") && (await deleteReview(reviewId))
  }

  const RenderReviews = () => {
    return reviews.map((review: any, index: number) => (
      <div key={index} className="py-4">
        <div className="flex gap-2">
          <div className="inline-flex h-10 w-14 items-center justify-center rounded-full bg-gray-800">
            <span className="text-xl uppercase text-white">{review.name.charAt(0)}</span>
          </div>
          <div className="w-full text-gray-500">
            <span className="flex w-full items-center justify-between whitespace-nowrap text-sm font-medium text-gray-800">
              <div>{review.name}</div>
            </span>
            <div className="text-left text-sm">{review.comment}</div>
          </div>
          <div className="flex items-start justify-center gap-[0.18rem]">
            <span className="text-base">{review.rating}</span>
            <StarFilledSVG className="mt-[0.2rem]  text-primary" />
          </div>
          <DeleteSVG
            className="rounded-sm text-2xl text-red-500 hover:cursor-pointer hover:bg-gray-100"
            onClick={() => removeReview(review.id)}
          />
        </div>
      </div>
    ))
  }

  return (
    <>
      <Button size={"sm"} responsive onClick={toggleReviewForm} className="mt-6 font-semibold">
        Add Review {isReviewFormOpen ? "-" : "+"}
      </Button>

      <ReviewForm isReviewFormOpen={isReviewFormOpen} closeReviewForm={closeReviewForm} workId={workId} />
      <div className="mb-10 mt-2">
        <RenderReviews />
      </div>
    </>
  )
}
