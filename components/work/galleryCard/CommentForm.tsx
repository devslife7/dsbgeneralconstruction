import Button from "@/components/ui/button"
import { useState } from "react"
import MyRating from "../../_oldcomponents/work/MyRating"
import { useRouter } from "next/navigation"
import { SpinnerSVG } from "@/public/svgs"

type Props = {
  isCommentFormOpen: boolean
  closeCommentForm: () => void
  workId: string
  setWork?: (arg: any) => void
  createReview: (data: any, workId: number) => void
}

export default function CommentForm({
  isCommentFormOpen,
  closeCommentForm,
  workId,
  setWork,
  createReview,
}: Props) {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCommentSubmit = async () => {
    setIsLoading(true)
    const data = {
      name,
      comment,
      rating,
    }
    await createReview(data, Number(workId))
    router.refresh()
    resetForm()
    setIsLoading(false)
  }

  const resetForm = () => {
    setName("")
    setComment("")
    setRating(0)
    closeCommentForm()
  }

  return (
    <div
      id="Comments_form"
      className={`flex flex-col mt-5 gap-4 max-w-md ${!isCommentFormOpen && "hidden"}  p-4`}
    >
      <div className="flex justify-between">
        <label className="text-xl text-gray-700">Comment</label>
        <MyRating readOnly={false} setRatingParent={setRating} parentRating={rating} />
      </div>
      <input
        type="text"
        placeholder="Name..."
        value={name}
        onChange={e => setName(e.target.value)}
        className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
      <textarea
        placeholder="Comment..."
        value={comment}
        rows={4}
        onChange={e => setComment(e.target.value)}
        className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="primary" onClick={handleCommentSubmit} disabled={isLoading}>
          {isLoading && <SpinnerSVG className="animate-spin" />}
          Post
        </Button>
      </div>
    </div>
  )
}
