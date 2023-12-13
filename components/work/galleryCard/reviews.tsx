"use client"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CommentForm from "../forms/CommentForm"
import { useState } from "react"
import { DeleteSVG, StarFilledSVG } from "@/public/svgs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { WorkType } from "@/lib/validators/work"
import { deleteReview } from "@/actions/review"

export default function Reviews({ work }: { work: WorkType }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const router = useRouter()

  const openReviewForm = () => setIsReviewFormOpen(true)
  const closeReviewForm = () => setIsReviewFormOpen(false)

  const toggleReviewForm = () => setIsReviewFormOpen(prevState => !prevState)

  const handleReviewDelete = async (reviewId: number) => {
    await deleteReview(reviewId)
  }

  const renderReviews = () => {
    return work.Review.map((review, index) => (
      <div key={index} className="my-10">
        <div className="flex gap-2">
          <div className="inline-flex h-10 w-14 items-center justify-center rounded-full bg-gray-800">
            <span className="text-xl uppercase text-white">{review.name.charAt(0)}</span>
          </div>
          <div className="w-full text-gray-500">
            <span className="flex w-full items-center justify-between whitespace-nowrap font-medium text-gray-800">
              <div>{review.name}</div>
            </span>
            <div className="text-left">{review.comment}</div>
          </div>
          <div className="flex items-start gap-[0.18rem]">
            <span className="text-base">{review.rating}</span>
            <StarFilledSVG className="mt-[0.1rem] text-xl text-primary" />
          </div>
          <DeleteSVG
            className="rounded-sm text-3xl text-red-500 hover:cursor-pointer hover:bg-gray-100"
            onClick={() => handleReviewDelete(review.id)}
          />
        </div>
      </div>
    ))
  }

  return (
    <DialogContent className={cn("", { "h-full": work.Review.length > 0 })}>
      <DialogHeader>
        <DialogTitle>
          <div className="flex justify-between">
            <div>
              <div className="mb-2 text-xl opacity-80">{work.title}</div>
              <div className="text-lg font-normal opacity-60">{work.description}</div>
            </div>
            <div className="mt-5 flex">
              <div className="mr-1 mt-[0.1rem] text-xl font-normal opacity-70">{work.rating.toFixed(1)}</div>
              <StarFilledSVG className="text-[1.7rem] text-primary" />
            </div>
          </div>
        </DialogTitle>
        {work.Review.length > 0
          ? renderReviews()
          : !isReviewFormOpen && (
              <>
                <div className="my-10">
                  <div className="mb-4 text-center opacity-50">
                    No reviews yet, be the first one to review.
                  </div>
                </div>
                <div className="mb-10 cursor-pointer text-center opacity-50" onClick={toggleReviewForm}>
                  <u>add review</u>
                </div>
              </>
            )}
        <CommentForm
          isCommentFormOpen={isReviewFormOpen}
          closeCommentForm={closeReviewForm}
          workId={work.id.toString()}
          // createReview={createReview}
        />
      </DialogHeader>
    </DialogContent>
  )
}
