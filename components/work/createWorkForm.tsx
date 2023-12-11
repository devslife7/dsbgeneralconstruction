"use client"
import { useRef, useState } from "react"
import { addWork } from "@/actions/work"
import Image from "next/image"
import Button, { buttonStyles } from "../ui/button"
import { useFormStatus } from "react-dom"
import { PreviewMedia } from "@/lib/validators/types"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PlusSVG } from "@/public/svgs"
import { WorkSchema, WorkErrors } from "@/lib/validators/work"
import { Input } from "../ui/input"
import { ACCEPTED_MEDIA_TYPES } from "@/lib/constants"

export default function CreatePostForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const [openDialog, setOpenDialog] = useState(false)
  const [errors, setErrors] = useState<WorkErrors>({})

  const closerDialog = () => setOpenDialog(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr: FileList | null = e.target.files as FileList
    let fileUrlArr: PreviewMedia[] = []
    if (previewMediaObj) {
      setPreviewMediaObj(undefined)
      previewMediaObj.forEach(file => {
        URL.revokeObjectURL(file.url)
      })
    }
    for (let i = 0; i < fileArr.length; i++) {
      fileUrlArr.push({ type: fileArr[i].type, url: URL.createObjectURL(fileArr[i]) })
    }
    setPreviewMediaObj(fileUrlArr)
  }

  const formAction = async (formData: FormData) => {
    // client-side validation
    const parsedData = WorkSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      media: formData.getAll("media"),
    })

    if (!parsedData.success) {
      let errors: WorkErrors = {}
      parsedData.error.issues.forEach(issue => {
        errors = { ...errors, [issue.path[0]]: issue.message }
      })
      console.log("errors: ", errors)
      console.log("parsedData: ", parsedData)
      setErrors(errors)
      return
    } else setErrors({})

    const response = await addWork(formData)
    if (response.status === 406) {
      toast.error("Validation Error", { description: response.message })
      return
    }
    if (response.status === 200) toast.success(response.message)
    if (response.status === 500) toast.error(response.message)

    // Reset Form
    closerDialog()
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    ref.current?.reset()
  }

  return (
    <Dialog open={true}>
      <div className="w-full text-right pr-5 pb-5 lg:pr-32">
        <DialogTrigger onClick={() => setOpenDialog(true)}>
          <div className={buttonStyles()}>
            <PlusSVG className="text-2xl" />
            Add Work
          </div>
        </DialogTrigger>
      </div>
      <DialogContent>
        <form action={formAction} ref={ref} className="rounded-lg">
          <div className="flex flex-col gap-6 w-full">
            <label className="text-xl opacity-80 font-medium"> Add Work</label>
            <div>
              <label className="text-gray-700 text-sm font-bold mb-2">Title</label>
              <Input
                placeholder="Title*"
                type="text"
                name="title"
                onFocus={() => setErrors({ ...errors, title: "" })}
              />
              <span className="text-red-400 text-sm">{errors.title}</span>
            </div>
            <div>
              <label className="text-gray-700 text-sm font-bold mb-2">Description</label>

              <Input
                placeholder="Description*"
                type="text"
                name="description"
                onFocus={() => setErrors({ ...errors, description: "" })}
              />
              <span className="text-red-400 text-sm">{errors.description}</span>
            </div>

            <div>
              {previewMediaObj ? previewFile(previewMediaObj) : null}
              <input
                className="border-none outline-none text-sm"
                name="media"
                type="file"
                multiple
                accept={ACCEPTED_MEDIA_TYPES.join(", ")}
                onChange={handleChange}
                onFocus={() => setErrors({ ...errors, media: "" })}
              />
              <span className="text-red-400 text-sm block">{errors.media}</span>
            </div>
          </div>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Submit button using pending state from useFormStatus
const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <div className="flex justify-between items-center mt-7">
      <Button aria-disabled={pending} disabled={pending} type="submit">
        {pending ? "Loading..." : "Submit"}
      </Button>
    </div>
  )
}

// Preview first file in array of selected items
const previewFile = (previewMediaObj: PreviewMedia[]) => {
  return (
    // <div className="gap-4 items-start pb-4 bg-red-100 overflow-auto w-[200px] h-[400px]">
    <div className="flex flex-wrap gap-1 items-start pb-4 w-full">
      {previewMediaObj.map((file, idx) =>
        file.type.startsWith("image/") ? (
          <div key={idx} className="rounded-lg h-32 w-32 overflow-hidden relative">
            <Image className="object-cover" src={file.url} alt="preview" priority={true} fill={true} />
          </div>
        ) : (
          <div key={idx} className="rounded-lg overflow-hidden w-200 h-300 relative">
            <video className="object-cover" src={file.url} autoPlay loop muted />
          </div>
        )
      )}
    </div>
  )
}
