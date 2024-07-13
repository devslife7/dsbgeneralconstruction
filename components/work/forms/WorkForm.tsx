"use client"
import { getPresignedURL } from "@/actions/s3Upload"
import { addWork as addWorkAction, updateWork as updateWorkAction } from "@/actions/work"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { ACCEPTED_FILE_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PreviewMedia } from "@/lib/validators/types"
import { AddWorkSchema, EditWorkSchema, WorkFormFields, WorkFormType } from "@/lib/validators/work"
import { SpinnerSVG } from "@/public/svgs"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import Button from "../../ui/my-button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WorkForm({ onOpenChange, work = null }: WorkFormType) {
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[]>([])
  const [currentFiles, setCurrentFiles] = useState<FileList>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<WorkFormFields>({
    defaultValues: { title: work?.title, description: work?.description }
  })

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)

    // If no files are selected, reset the files to the previous files
    if (filesArray.length === 0) {
      setPreviewMediaObj(previewMediaObj)
      e.target.files = currentFiles ?? new DataTransfer().files
      return
    }

    // Revokes all the previous files
    if (previewMediaObj.length !== 0) {
      previewMediaObj.forEach(file => {
        URL.revokeObjectURL(file.url)
      })
      setPreviewMediaObj([])
    }

    // Creates a new array of objects with file type and url
    const filePreviewOjbect = filesArray.map(file => {
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }
    })

    setPreviewMediaObj(filePreviewOjbect)
    setCurrentFiles(e.target.files)
  }

  const setValidationErrors = (errors: any) => {
    Object.keys(errors).forEach(key => {
      if (errors[key]) {
        setError(key as keyof WorkFormFields, { message: errors[key]![0] })
      }
    })
  }

  const editWorkData = async ({ title, description }: WorkFormFields) => {
    const validData = EditWorkSchema.safeParse({ title, description, id: work?.id })
    console.log("validData", validData)
    if (!validData.success) {
      setValidationErrors(validData.error.flatten().fieldErrors)
      return { errorMessage: "Validation Error" }
    }

    const response = await updateWorkAction({
      title: validData.data.title,
      description: validData.data.description,
      id: work?.id
    })
    if (!response.success) {
      console.log("Server Error while updating work: ", response.errors)
      return { errorMessage: "Failed to update Work. Check console logs for more info." }
    }

    return { success: true, message: "Successfully updated Work." }
  }

  const addWorkData = async ({ title, description }: WorkFormFields) => {
    const validData = AddWorkSchema.safeParse({ title, description, files: Array.from(currentFiles ?? []) })
    if (!validData.success) {
      setValidationErrors(validData.error.flatten().fieldErrors)
      return { errorMessage: "Validation Error" }
    }

    const responseFiles = await uploadFiles(validData.data.files)
    if (!responseFiles.success) return { errorMessage: "Failed to upload files." }

    const responseWork = await addWorkAction({
      title: validData.data.title,
      description: validData.data.description,
      files: responseFiles.urlList
    })
    if (!responseWork.success) return { errorMessage: "Failed to add Work." }

    return { success: true, message: "Successfully added Work." }
  }

  const onSubmit: SubmitHandler<WorkFormFields> = async (data: WorkFormFields) => {
    const resp = work ? await editWorkData(data) : await addWorkData(data)
    if (!resp.success) return console.log(resp.errorMessage)
    toast.success(resp.message)

    onOpenChange(false)
    setPreviewMediaObj([])
    window.scrollTo(0, 0)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        <Label required>Title</Label>
        <Input
          {...register("title")}
          name="title"
          placeholder="Fence Replacement"
          disabled={isSubmitting}
          error={errors && errors.title}
        />
      </div>
      <div>
        <Label required>Description</Label>
        <Textarea
          {...register("description")}
          name="description"
          placeholder="Replacement for a fence that was damaged by a storm."
          disabled={isSubmitting}
          error={errors && errors.description}
        />
      </div>

      <div className={cn({ hidden: work })}>
        <Label required>Photos/Videos</Label>
        {previewMediaObj.length > 0 && previewFile(previewMediaObj, isSubmitting)}
        <Input
          {...register("files")}
          name="files"
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(", ")}
          onChange={handleFilesChange}
          disabled={isSubmitting}
          className={errors.files && "border-destructive"}
        />
        {errors.files && <span className="text-sm text-destructive">{errors.files.message}</span>}
      </div>

      <Modal.Footer>
        <Modal.Close asChild>
          <Button disabled={isSubmitting} variant="cancel">
            Close
          </Button>
        </Modal.Close>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <SpinnerSVG className="animate-spin" /> : "Submit"}
        </Button>
      </Modal.Footer>
    </form>
  )
}

// Upload multiple files to AWS S3
const uploadFiles = async (files: File[]) => {
  const promiseArray = files.map(file => getPresignedURL(file.type))
  const presignedURLS = await Promise.all(promiseArray)

  const fileURLArr = files.map((file, idx) => {
    const url = presignedURLS[idx].uploadUrl
    return uploadFile(file, url)
  })

  const urlList = await Promise.all(fileURLArr)
  return { success: true, urlList }
}

// Uploads a single file using presigned url
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
    <div
      className={cn("mb-4 mt-2 grid grid-cols-4 gap-1", {
        "opacity-50": isSubmiting
      })}
    >
      {previewMediaObj.map((file, idx) =>
        file.type.startsWith("image/") ? (
          <div key={idx} className="relative h-24 overflow-hidden rounded-lg bg-blue-500">
            <Image className="items-center object-cover object-center" src={file.url} alt="preview" fill />
          </div>
        ) : (
          <div key={idx} className="relative h-24 overflow-hidden rounded-lg">
            <video className="object-cover" src={file.url} autoPlay playsInline loop muted />
          </div>
        )
      )}
    </div>
  )
}
