"use client"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CommentForm from "./CommentForm"
import { useState } from "react"
import { DeleteSVG, StarFilledSVG } from "@/public/svgs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { WorkType } from "@/lib/validators/work"

type Props = {
  work: WorkType
  deleteReview: (reviewId: number) => void
  createReview: (data: any, workId: number) => void
}

export default function Reviews({ work, deleteReview, createReview }: Props) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const router = useRouter()

  const openReviewForm = () => setIsReviewFormOpen(true)
  const closeReviewForm = () => setIsReviewFormOpen(false)

  const toggleReviewForm = () => setIsReviewFormOpen(prevState => !prevState)

  const handleReviewDelete = async (reviewId: number) => {
    await deleteReview(reviewId)
    router.refresh()
  }

  const renderReviews = () => {
    return work.Review.map((review, index) => (
      <div key={index} className="my-10">
        <div className="flex gap-2">
          <div className="inline-flex items-center justify-center w-14 h-10 bg-gray-800 rounded-full">
            <span className="text-xl text-white uppercase">{review.name.charAt(0)}</span>
          </div>
          <div className="text-gray-500 w-full">
            <span className="font-medium text-gray-800 whitespace-nowrap flex justify-between w-full items-center">
              <div>{review.name}</div>
            </span>
            <div className="text-left">{review.comment}</div>
          </div>
          <div className="flex items-start gap-[0.18rem]">
            <span className="text-base">{review.rating}</span>
            <StarFilledSVG className="text-primary text-xl mt-[0.1rem]" />
          </div>
          {/* <DeleteSVG
            className="text-red-500 text-3xl hover:cursor-pointer hover:bg-gray-100 rounded-sm"
            onClick={() => handleReviewDelete(review.id)}
          /> */}
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
              <div className="font-normal text-lg opacity-60">{work.description}</div>
            </div>
            <div className="flex mt-5">
              <div className="font-normal text-xl opacity-70 mt-[0.1rem] mr-1">{work.rating.toFixed(1)}</div>
              <StarFilledSVG className="text-primary text-[1.7rem]" />
            </div>
          </div>
        </DialogTitle>
        {work.Review.length > 0 ? (
          renderReviews()
        ) : (
          <div className="my-10">
            <div className="text-center opacity-50 mb-4">No reviews yet, be the first one to review.</div>
          </div>
        )}
        <div className="text-center opacity-50 cursor-pointer mb-10" onClick={toggleReviewForm}>
          <u>add review</u>
        </div>
        {/* <CommentForm
          isCommentFormOpen={isReviewFormOpen}
          closeCommentForm={closeReviewForm}
          // workId={work.id.toString()}
          createReview={createReview}
        /> */}
      </DialogHeader>
    </DialogContent>
  )
}
