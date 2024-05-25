import Button from "@/components/ui/button"
import { useRef, useState } from "react"
import { SpinnerSVG } from "@/public/svgs"
import { cn } from "@/lib/utils"
import { ReviewErrors, ReviewSchema } from "@/lib/validators/review"
import { addReview } from "@/actions/review"
import { toast } from "sonner"
import { useFormStatus } from "react-dom"
import Rating from "@/components/ui/rating"
import { TextArea } from "@/components/ui/textArea"
import { Input } from "@/components/ui/input"

type ReviewFormProps = {
  isReviewFormOpen: boolean
  closeReviewForm: () => void
  workId: number
}

export default function ReviewForm({ isReviewFormOpen, closeReviewForm, workId }: ReviewFormProps) {
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

    const parsedData = ReviewSchema.safeParse(newReview)
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
    setErrors({})
    setRating(0)
    ref.current?.reset()
  }

  return (
    <form
      action={submitAction}
      ref={ref}
      className={cn("mt-5 max-w-md space-y-3", { hidden: !isReviewFormOpen })}
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
      <Input
        type="text"
        name="name"
        className="text-base"
        autoFocus
        placeholder="Name..."
        onFocus={() => setErrors({ ...errors, name: "" })}
        errors={errors.name}
      />
      <TextArea
        placeholder="Comment..."
        className="text-base"
        rows={4}
        name="comment"
        onFocus={() => setErrors({ ...errors, comment: "" })}
        errors={errors.comment}
      />
      <FormButtons resetForm={resetForm} />
    </form>
  )
}

const FormButtons = ({ resetForm }: { resetForm: () => void }) => {
  const { pending } = useFormStatus()
  return (
    <div className="space-y-4">
      <Button responsive aria-disabled={pending} disabled={pending}>
        {pending ? <SpinnerSVG className="animate-spin" /> : "Post"}
      </Button>
      <Button
        responsive
        variant="cancel"
        type="button"
        onClick={resetForm}
        aria-disabled={pending}
        disabled={pending}
      >
        Cancel
      </Button>
    </div>
  )
}
