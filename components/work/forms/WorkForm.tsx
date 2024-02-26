"use client"
import { useRef, useState } from "react"
import { addWork, updateWork } from "@/actions/work"
import Image from "next/image"
import Button from "../../ui/button"
import { PreviewMedia } from "@/lib/validators/types"
import { toast } from "sonner"
import { WorkSchema, WorkErrors, WorkType, EditWorkSchema } from "@/lib/validators/work"
import { Input } from "../../ui/input"
import { ACCEPTED_MEDIA_EXTENSIONS, ACCEPTED_MEDIA_TYPES } from "@/lib/constants"
import { Modal } from "@/components/ui/modal"
import { useFormStatus } from "react-dom"
import { SpinnerSVG } from "@/public/svgs"
import { cn } from "@/lib/utils"
import { TextArea } from "@/components/ui/textArea"
import { getPresignedURL } from "@/actions/s3Upload"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  title: string
  description: string
  files: File[]
}

export default function WorkForm({
  onOpenChange,
  work
}: {
  onOpenChange: (open: boolean) => void
  work?: WorkType
}) {
  const ref = useRef<HTMLFormElement>(null)
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const [errors, setErrors] = useState<{ title?: string[]; description?: string[]; media?: string[] }>({
    title: [""],
    description: [""],
    media: [""]
  })

  const { register, handleSubmit } = useForm<Inputs>()

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
    // if (work) await editWorkClient(formData)
    // else await addWorkClient(formData)
    await addWorkClient(formData)
  }

  // const editWorkClient = async (formData: FormData) => {
  //   // client-side validation
  //   const parsedData = EditWorkSchema.safeParse({
  //     title: formData.get("title"),
  //     description: formData.get("description")
  //   })
  //   if (!parsedData.success) {
  //     let errors: WorkErrors = {}
  //     parsedData.error.issues.forEach(issue => {
  //       errors = { ...errors, [issue.path[0]]: issue.message }
  //     })
  //     setErrors(errors)
  //     return
  //   } else setErrors({})

  //   // server action: update work
  //   const response = await updateWork(formData, work!)
  //   if (response.status === 406) {
  //     toast.error("Validation Error", { description: response.message })
  //     return
  //   }
  //   if (response.status === 200) toast.success(response.message)
  //   if (response.status === 500) toast.error(response.message)
  //   resetForm()
  // }

  const addWorkClient = async (formData: FormData) => {
    // client-side validation
    const parsedData = WorkSchema.safeParse({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      media: formData.getAll("media") as File[]
    })
    if (!parsedData.success) return setErrors(parsedData.error.flatten().fieldErrors)

    // upload files to s3
    const resp = await uploadFiles(parsedData.data.media)
    if (!resp.success) return toast.error("Failed to upload files.")

    // server action: add work
    const response = await addWork({
      title: parsedData.data.title,
      description: parsedData.data.description,
      media: resp.urlList
    })
    if (response.status === 406) return toast.error("Validation Error", { description: response.message })
    if (response.status === 200) toast.success(response.message)
    if (response.status === 500) toast.error(response.message)

    resetForm()
  }

  const resetForm = () => {
    onOpenChange(false)
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    ref.current?.reset()
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log("data: ", data)
    // const formData = new FormData()
    // formData.append("title", data.title)
    // formData.append("description", data.description)
    // data.files.forEach(file => {
    //   formData.append("media", file)
    // })
    // formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={ref} className="w-full space-y-6">
      <Input {...register("title")} name="title" placeholder="Title*" />
      <TextArea {...register("description")} name="description" placeholder="Description*" />

      <div className={cn({ hidden: work })}>
        {previewMediaObj ? previewFile(previewMediaObj) : null}
        <Input
          {...register("files")}
          className="cursor-pointer"
          name="files"
          type="file"
          multiple
          accept={ACCEPTED_MEDIA_EXTENSIONS.join(", ")}
          onChange={handleChange}
        />
      </div>
      <FormButtons />
    </form>
  )
}

// Upload files to AWS S3
const uploadFiles = async (fileList: File[]) => {
  const promiseArray = fileList.map(file => getPresignedURL(file.type))
  const presignedURLS = await Promise.all(promiseArray)

  const fileUrlArr = []
  for (let i = 0; i < fileList.length; i++) {
    const url = presignedURLS[i].uploadUrl as string
    const file = fileList[i]
    fileUrlArr.push(uploadFile(file, url))
  }

  const urlList = await Promise.all(fileUrlArr)
  return { success: true, urlList }
}

// Upload file to S3 using presigned url
async function uploadFile(file: File, url: string) {
  await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type
    }
  }).catch(e => console.error(e))
  return url.split("?")[0]
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
            <Image className="object-cover" src={file.url} alt="preview" priority fill />
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
