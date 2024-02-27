"use client"
import { getPresignedURL } from "@/actions/s3Upload"
import { addWork, updateWork } from "@/actions/work"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { TextArea } from "@/components/ui/textArea"
import { ACCEPTED_FILE_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PreviewMedia } from "@/lib/validators/types"
import { EditWorkSchema, WorkFormSchema, WorkFormType, WorkType } from "@/lib/validators/work"
import { SpinnerSVG } from "@/public/svgs"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import Button from "../../ui/button"

type FormType = {
  onOpenChange: (open: boolean) => void
  work?: WorkType
}

export default function WorkForm({ onOpenChange, work }: FormType) {
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<WorkFormType>({
    defaultValues: { title: work?.title, description: work?.description },
    resolver: zodResolver(work ? EditWorkSchema : WorkFormSchema)
  })

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

  const onSubmit: SubmitHandler<WorkFormType> = async ({ title, description, files }) => {
    if (work) {
      const response = await updateWork({ title, description, id: work.id })
      if (!response.success) {
        console.log("Server Error: ", response.errors)
        toast.error("Failed to update Work. Check console logs for more info.")
        return
      }
      toast.success("Work updated.")
      resetForm()
      return
    }
    // upload files to s3
    const responseFiles = await uploadFiles(files)
    if (!responseFiles.success) return toast.error("Failed to upload files.")
    // server action add work
    const responseWork = await addWork({
      title,
      description,
      files: responseFiles.urlList
    })
    if (!responseWork.success) return toast.error("Failed to add Work.")
    toast.success("Upload complete.")
    resetForm()
  }

  const resetForm = () => {
    onOpenChange(false)
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <Input {...register("title")} name="title" placeholder="Title*" disabled={isSubmitting} />
      {errors.title && <span className="text-sm text-red-400">{errors.title.message}</span>}
      <TextArea
        {...register("description")}
        name="description"
        placeholder="Description*"
        disabled={isSubmitting}
      />
      {errors.description && <span className="text-sm text-red-400">{errors.description.message}</span>}

      <div className={cn({ hidden: work })}>
        {previewMediaObj ? previewFile(previewMediaObj, isSubmitting) : null}
        <Input
          {...register("files")}
          name="files"
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(", ")}
          onChange={handleFilesChange}
          disabled={isSubmitting}
        />
        {errors.files && <span className="text-sm text-red-400">{errors.files.message}</span>}
      </div>

      <Modal.Footer>
        <Modal.Close asChild>
          <Button aria-disabled={isSubmitting} disabled={isSubmitting} variant="cancel">
            Close
          </Button>
        </Modal.Close>
        <Button type="submit" aria-disabled={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? <SpinnerSVG className="animate-spin" /> : "Submit"}
        </Button>
      </Modal.Footer>
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

// Preview first file in array of selected items
const previewFile = (previewMediaObj: PreviewMedia[], isSubmiting: boolean) => {
  return (
    // <div className="flex w-full flex-wrap items-start gap-1 pb-4 opacity-50">
    <div className={cn("flex w-full flex-wrap items-start gap-1 pb-4", { "opacity-50": isSubmiting })}>
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
