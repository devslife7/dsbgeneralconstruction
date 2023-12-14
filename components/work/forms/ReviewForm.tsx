import Button from "@/components/ui/button"
import { useState } from "react"
import MyRating from "../../_oldcomponents/work/MyRating"
import { useRouter } from "next/navigation"
import { SpinnerSVG } from "@/public/svgs"
import { cn } from "@/lib/utils"
import { reviewSchema } from "@/lib/validators/review"
import { addReview } from "@/actions/review"

type Props = {
  isReviewFormOpen: boolean
  closeReviewForm: () => void
  workId: number
}

export default function ReviewForm({ isReviewFormOpen, closeReviewForm, workId }: Props) {
  const [rating, setRating] = useState<number>(1)

  const handleReviewSubmit = async (formData: FormData) => {
    const newReview = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      rating: rating,
      workId: workId
    }

    const parsedData = reviewSchema.safeParse(newReview)
    if (!parsedData.success) {
      return
    }

    addReview(parsedData.data)
    // resetForm()
  }

  const resetForm = () => {
    setRating(1)
    closeReviewForm()
  }

  return (
    <form
      action={handleReviewSubmit}
      // className={`mt-5 flex max-w-md flex-col gap-2 ${!isReviewFormOpen && "hidden"}`}
      className={cn("mt-5 flex max-w-md flex-col gap-2", { hidden: !isReviewFormOpen })}
    >
      <label className="text-lg font-semibold text-gray-700">Add Review</label>
      <MyRating readOnly={false} reverse setRatingParent={setRating} parentRating={rating} />
      <input
        type="text"
        name="name"
        placeholder="Name..."
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <textarea
        placeholder="Comment..."
        rows={4}
        name="comment"
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="cancel" onClick={resetForm}>
          Cancel
        </Button>
        {/* <Button variant="primary" onClick={handleReviewSubmit}> */}
        <Button type="submit">
          {/* {isLoading && <SpinnerSVG className="animate-spin" />} */}
          Post
        </Button>
      </div>
    </form>
  )
}
