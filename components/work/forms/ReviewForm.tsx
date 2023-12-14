import Button from "@/components/ui/button"
import { useRef, useState } from "react"
import { SpinnerSVG } from "@/public/svgs"
import { cn } from "@/lib/utils"
import { ReviewErrors, reviewSchema } from "@/lib/validators/review"
import { addReview } from "@/actions/review"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import Rating from "@/components/ui/rating"

type Props = {
  isReviewFormOpen: boolean
  closeReviewForm: () => void
  workId: number
}

export default function ReviewForm({ isReviewFormOpen, closeReviewForm, workId }: Props) {
  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)
  const [rating, setRating] = useState<number>(0)
  const [errors, setErrors] = useState<ReviewErrors>({})

  const submitAction = async (formData: FormData) => {
    const newReview = {
      name: formData.get("name"),
      comment: formData.get("comment"),
      rating: rating,
      workId: workId
    }

    const parsedData = reviewSchema.safeParse(newReview)
    if (!parsedData.success) {
      let errors: ReviewErrors = {}
      parsedData.error.issues.forEach(issue => {
        errors = { ...errors, [issue.path[0]]: issue.message }
      })
      setErrors(errors)
      return
    } else setErrors({})

    const response = await addReview(parsedData.data)
    if (response.status === 406) {
      toast.error("Validation Error", { description: response.message })
      return
    }
    if (response.status === 200) toast.success(response.message)
    if (response.status === 500) toast.error(response.message)

    resetForm()
  }

  const resetForm = () => {
    closeReviewForm()
    setRating(0)
    ref.current?.reset()
  }

  return (
    <form
      action={submitAction}
      ref={ref}
      className={cn("mt-5 flex max-w-md flex-col gap-1", { hidden: !isReviewFormOpen })}
    >
      <label className="text-lg font-semibold text-gray-700">Add Review</label>
      <Rating
        readOnly={false}
        reverse
        setRatingParent={setRating}
        parentRating={rating}
        onClick={() => setErrors({ ...errors, rating: "" })}
      />
      <span className="text-sm text-red-400">{errors.rating}</span>
      <input
        type="text"
        name="name"
        placeholder="Name..."
        onClick={() => setErrors({ ...errors, name: "" })}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <span className="text-sm text-red-400">{errors.name}</span>
      <textarea
        placeholder="Comment..."
        rows={4}
        name="comment"
        onClick={() => setErrors({ ...errors, comment: "" })}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <span className="text-sm text-red-400">{errors.comment}</span>
      <div className="flex justify-end space-x-2">
        <Button variant="cancel" onClick={resetForm}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <div className="flex items-center justify-between">
      <Button aria-disabled={pending} disabled={pending} type="submit">
        {pending ? "Loading..." : "Submit"}
      </Button>
    </div>
  )
}
