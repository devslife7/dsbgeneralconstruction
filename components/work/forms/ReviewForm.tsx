import Button from "@/components/ui/button"
import { useState } from "react"
import MyRating from "../../_oldcomponents/work/MyRating"
import { useRouter } from "next/navigation"
import { SpinnerSVG } from "@/public/svgs"
import { createReview } from "@/actions/review"

type Props = {
  isCommentFormOpen: boolean
  closeCommentForm: () => void
  workId: string
  setWork?: (arg: any) => void
}

export default function ReviewForm({ isCommentFormOpen, closeCommentForm, workId, setWork }: Props) {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const router = useRouter()

  const handleCommentSubmit = async () => {
    const data = {
      name,
      comment,
      rating
    }
    await createReview(data, Number(workId))
    router.refresh()
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setComment("")
    setRating(0)
    closeCommentForm()
  }

  return (
    <form className={`mt-5 flex max-w-md flex-col ${!isCommentFormOpen && "hidden"}`}>
      <label className="text-xl text-gray-700">Add Review</label>
      <MyRating readOnly={false} reverse setRatingParent={setRating} parentRating={rating} />
      <input
        type="text"
        placeholder="Name..."
        value={name}
        onChange={e => setName(e.target.value)}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <textarea
        placeholder="Comment..."
        value={comment}
        rows={4}
        onChange={e => setComment(e.target.value)}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="cancel" onClick={resetForm}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCommentSubmit}>
          {/* {isLoading && <SpinnerSVG className="animate-spin" />} */}
          Post
        </Button>
      </div>
    </form>
  )
}
