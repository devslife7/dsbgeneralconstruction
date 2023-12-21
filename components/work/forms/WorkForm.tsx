"use client"
import { useRef, useState } from "react"
import { addWork } from "@/actions/work"
import Image from "next/image"
import Button from "../../ui/button"
import { PreviewMedia } from "@/lib/validators/types"
import { toast } from "sonner"
import { WorkSchema, WorkErrors } from "@/lib/validators/work"
import { Input } from "../../ui/input"
import { ACCEPTED_MEDIA_TYPES } from "@/lib/constants"
import { Modal } from "@/components/ui/modal"
import { useFormStatus } from "react-dom"
import { SpinnerSVG } from "@/public/svgs"

export default function WorkForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const ref = useRef<HTMLFormElement>(null)
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const [errors, setErrors] = useState<WorkErrors>({})

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
      fileUrlArr.push({
        type: fileArr[i].type,
        url: URL.createObjectURL(fileArr[i])
      })
    }
    setPreviewMediaObj(fileUrlArr)
  }

  const formAction = async (formData: FormData) => {
    const newWork = {
      title: formData.get("title"),
      description: formData.get("description"),
      media: formData.getAll("media")
    }
    // client-side validation
    const parsedData = WorkSchema.safeParse(newWork)
    if (!parsedData.success) {
      let errors: WorkErrors = {}
      parsedData.error.issues.forEach(issue => {
        errors = { ...errors, [issue.path[0]]: issue.message }
      })
      setErrors(errors)
      return
    } else setErrors({})

    // server action: add work
    const response = await addWork(formData)
    if (response.status === 406) {
      toast.error("Validation Error", { description: response.message })
      return
    }
    if (response.status === 200) toast.success(response.message)
    if (response.status === 500) toast.error(response.message)

    // Reset Form
    onOpenChange(false)
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    ref.current?.reset()
  }

  return (
    <form action={formAction} ref={ref} className="w-full space-y-6">
      <Input
        name="title"
        placeholder="Title*"
        onFocus={() => setErrors({ ...errors, title: "" })}
        errors={errors.title}
      />
      <Input
        name="description"
        placeholder="Description*"
        onFocus={() => setErrors({ ...errors, description: "" })}
        errors={errors.description}
      />

      {previewMediaObj ? previewFile(previewMediaObj) : null}
      <Input
        className="cursor-pointer"
        name="media"
        type="file"
        multiple
        accept={ACCEPTED_MEDIA_TYPES.join(", ")}
        onChange={handleChange}
        onFocus={() => setErrors({ ...errors, media: "" })}
        errors={errors.media}
      />
      <FormButtons />
    </form>
  )
}

// Form Buttons for Cancel and Submit
const FormButtons = () => {
  const { pending } = useFormStatus()
  return (
    <Modal.Footer>
      <Modal.Close asChild>
        <Button aria-disabled={pending} disabled={pending} variant="cancel">
          Close
        </Button>
      </Modal.Close>
      <Button type="submit" aria-disabled={pending} disabled={pending}>
        {pending ? <SpinnerSVG className="animate-spin" /> : "Submit"}
      </Button>
    </Modal.Footer>
  )
}

// Preview first file in array of selected items
const previewFile = (previewMediaObj: PreviewMedia[]) => {
  return (
    // <div className="gap-4 items-start pb-4 bg-red-100 overflow-auto w-[200px] h-[400px]">
    <div className="flex w-full flex-wrap items-start gap-1 pb-4">
      {previewMediaObj.map((file, idx) =>
        file.type.startsWith("image/") ? (
          <div key={idx} className="relative h-32 w-32 overflow-hidden rounded-lg">
            <Image className="object-cover" src={file.url} alt="preview" priority={true} fill={true} />
          </div>
        ) : (
          <div key={idx} className="w-200 h-300 relative overflow-hidden rounded-lg">
            <video className="object-cover" src={file.url} autoPlay loop muted />
          </div>
        )
      )}
    </div>
  )
}
