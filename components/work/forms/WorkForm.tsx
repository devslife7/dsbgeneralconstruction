"use client"
import { PreviewMedia } from "@/lib/validators/types"
import Image from "next/image"
import { useState } from "react"
import z from "zod"
import Button from "../../ui/button"
// import { WorkFormSchema, WorkFormType } from "@/lib/validators/work"
import { getPresignedURL } from "@/actions/s3Upload"
import { addWork } from "@/actions/work"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { TextArea } from "@/components/ui/textArea"
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { WorkType } from "@/lib/validators/work"
import { SpinnerSVG } from "@/public/svgs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormStatus } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export default function WorkForm({ onOpenChange, work }: FormType) {
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<WorkFormType>({ resolver: zodResolver(WorkFormSchema) })

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // await addWorkClient(formData)
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
    // upload files to s3
    // Array.from(files).every(file => file.size < MAX_FILE_SIZE)
    // const resp = await uploadFiles(parsedData.data.media)
    // if (!resp.success) return toast.error("Failed to upload files.")
    // // server action: add work
    // const response = await addWork({
    //   title: parsedData.data.title,
    //   description: parsedData.data.description,
    //   media: resp.urlList
    // })
    // if (response.status === 406) return toast.error("Validation Error", { description: response.message })
    // if (response.status === 200) toast.success(response.message)
    // if (response.status === 500) toast.error(response.message)
    // resetForm()
  }

  const resetForm = () => {
    onOpenChange(false)
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    // ref.current?.reset()
  }

  const onSubmit: SubmitHandler<WorkFormType> = async ({ title, description, files }) => {
    // upload files to s3
    const resp = await uploadFiles(files)
    if (!resp.success) return toast.error("Failed to get presigned urls.")
    // server action add work
    const response = await addWork({
      title,
      description,
      files: resp.urlList
    })
    if (!response.success) return toast.error("Failed to upload files.")

    // const formData = new FormData()
    // formData.append("title", data.title)
    // formData.append("description", data.description)
    // data.files.forEach(file => {
    //   formData.append("media", file)
    // })
    // formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <Input {...register("title")} name="title" placeholder="Title*" />
      {errors.title && <span className="text-sm text-red-400">{errors.title.message}</span>}
      <TextArea {...register("description")} name="description" placeholder="Description*" />
      {errors.description && <span className="text-sm text-red-400">{errors.description.message}</span>}

      <div className={cn({ hidden: work })}>
        {previewMediaObj ? previewFile(previewMediaObj) : null}
        <Input
          {...register("files")}
          name="files"
          type="file"
          multiple
          // accept={ACCEPTED_FILE_TYPES.join(", ")}
          onChange={handleFilesChange}
        />
        {errors.files && <span className="text-sm text-red-400">{errors.files.message}</span>}
      </div>
      <FormButtons />
    </form>
  )
}

// Upload files to AWS S3
const uploadFiles = async (files: FileList) => {
  const promiseArray = Array.from(files).map(file => getPresignedURL(file.type))
  const presignedURLS = await Promise.all(promiseArray)

  const fileUrlArr = []
  for (let i = 0; i < files.length; i++) {
    const url = presignedURLS[i].uploadUrl as string
    const file = files[i]
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

type FormType = {
  onOpenChange: (open: boolean) => void
  work?: WorkType
}
type WorkFormType = z.infer<typeof WorkFormSchema>
const WorkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(80, "Name must be less than 80 characters long."),
  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters long.")
    .max(128, "Description must be less than 128 characters long."),
  files: z
    .instanceof(FileList)
    .refine(files => files.length > 0, "sMedia files are required.")
    .refine(files => files.length <= 15, "Media must be less than 15 files.")
    .refine(
      files => Array.from(files).every(file => file.size < MAX_FILE_SIZE),
      `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB) `
    )
    .refine(
      files => Array.from(files).every(file => ACCEPTED_FILE_TYPES.includes(file.type)),
      `Accepted file types: ${ACCEPTED_FILE_TYPES.join(", ")}.`
    )
})
