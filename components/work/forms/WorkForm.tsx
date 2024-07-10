"use client"
import { getPresignedURL } from "@/actions/s3Upload"
import { addWork, updateWork } from "@/actions/work"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { ACCEPTED_FILE_TYPES, ACCEPTED_FILE_TYPES_EXTENTION, MAX_FILE_SIZE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { PreviewMedia } from "@/lib/validators/types"
import { AddWorkSchema, EditWorkSchema, WorkType } from "@/lib/validators/work"
import { SpinnerSVG } from "@/public/svgs"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import Button from "../../ui/my-button"
import { Label } from "@/components/ui/label"
import { AddWorkClientSchema, AddWorkSchemaClientType, FileArraySchema } from "@/lib/validators/client"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { title } from "process"

const ACCEPTED_FILES_TYPES: [string, ...string[]] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/quicktime",
  "video/webm"
]

type FormType = {
  onOpenChange: (open: boolean) => void
  work?: WorkType | null
}

const AddWorkFormSchema = z.object({
  title: z.any(),
  description: z.any(),
  files: z.any()
})

type AddWorkFormType = {
  title: string
  description: string
  files: FileList
}
type FormFields = {
  title: string
  description: string
  files: FileList
}

export default function WorkForm({ onOpenChange, work = null }: FormType) {
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [formDataTest, setFormDataTest] = useState<any>({})

  const [formTitle, setFormTitle] = useState<string>("")
  const [formDescription, setFormDescription] = useState<string>("")
  const [formFiles, setFormFiles] = useState<any>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<FormFields>({
    defaultValues: { title: work?.title, description: work?.description }
    // resolver: zodResolver(work ? EditWorkSchema : AddWorkSchema)
    // resolver: zodResolver(work ? EditWorkSchema : AddWorkClientSchema)
  })

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFiles(e.target.files)
    console.log("e:", e.target.files)
    const fileArr: FileList | null = e.target.files as FileList
    if (previewMediaObj) {
      setPreviewMediaObj(undefined)
      previewMediaObj.forEach(file => {
        URL.revokeObjectURL(file.url)
      })
    }
    let fileUrlArr: PreviewMedia[] = []
    for (let i = 0; i < fileArr.length; i++) {
      fileUrlArr.push({
        type: fileArr[i].type,
        url: URL.createObjectURL(fileArr[i])
      })
    }
    setPreviewMediaObj(fileUrlArr)
  }

  const onSubmit: SubmitHandler<FormFields> = async data => {
    // setFormDataTest(data)

    const { title, description, files } = data
    console.log("title:", title)
    console.log("title:", formTitle)
    console.log("description:", description)
    console.log("description:", formDescription)
    console.log("files:", files)
    console.log("files:", formFiles)
    console.log("files length:", files.length)

    const filesString = JSON.stringify(files)
    const formFilesString = JSON.stringify(formFiles)
    alert(
      "title: " +
        formTitle +
        "\ndescription: " +
        formDescription +
        "\nfiles: " +
        formFilesString +
        "\nfiles length:" +
        formFiles.length
    )
    // console.log("Enters Submit with data:", data.toString())
    // const fileArray = Array.from(data.files)
    // console.log("files:", fileArray.toString())

    // const validationObject = {
    //   title: data.title,
    //   description: data.description,
    //   files: data.files
    // }

    // const validatedFileList = AddWorkSchema.safeParse(validationObject)
    // if (!validatedFileList.success) {
    //   const errorMessages = validatedFileList.error.flatten().fieldErrors
    //   console.log("validatedFileList:", errorMessages)
    //   // setFormErrors(validationObject)

    //   Object.keys(errorMessages).forEach(key => {
    //     if (key in errorMessages) {
    //       // @ts-ignore comment out to see error
    //       setError(key, { message: errorMessages[key][0] })
    //     }
    //   })
    // }

    // update work if work exists
    // const fileList = Array.from(files)
    // console.log("files:::::", fileList)
    // const validatedFileList = FileArraySchema.safeParse(fileList)
    // if (!validatedFileList.success) {
    //   console.log("validatedFileList:::::", validatedFileList.error.flatten().formErrors)
    //   setFormErrors(validatedFileList.error.flatten().formErrors)
    // }

    // if (work) {
    //   const response = await updateWork({ title, description, id: work.id })
    //   if (!response.success) {
    //     console.log("Server Error: ", response.errors)
    //     toast.error("Failed to update Work. Check console logs for more info.")
    //     return
    //   }
    //   toast.success("Work updated.")
    //   resetForm()
    //   return
    // }
    // // upload files to s3
    // // TODO: change to files array from FileList then validate
    // const responseFiles = await uploadFiles(files)
    // if (!responseFiles.success) return toast.error("Failed to upload files.")
    // // server action add work
    // const responseWork = await addWork({
    //   title,
    //   description,
    //   files: responseFiles.urlList
    // })
    // if (!responseWork.success) return toast.error("Failed to add Work.")
    // toast.success("Upload complete.")
    // resetForm()
  }

  // const onSubmit: SubmitHandler<AddWorkFormType> = async ({ title, description, files }) => {
  //   // update work if work exists
  //   const fileList = Array.from(files)
  //   console.log("files:::::", fileList)
  //   const validatedFileList = FileArraySchema.safeParse(fileList)
  //   if (!validatedFileList.success) {
  //     console.log("validatedFileList:::::", validatedFileList.error.flatten().formErrors)
  //     setFormErrors(validatedFileList.error.flatten().formErrors)
  //   }

  //   return

  //   if (work) {
  //     const response = await updateWork({ title, description, id: work.id })
  //     if (!response.success) {
  //       console.log("Server Error: ", response.errors)
  //       toast.error("Failed to update Work. Check console logs for more info.")
  //       return
  //     }
  //     toast.success("Work updated.")
  //     resetForm()
  //     return
  //   }
  //   // upload files to s3
  //   // TODO: change to files array from FileList then validate
  //   const responseFiles = await uploadFiles(files)
  //   if (!responseFiles.success) return toast.error("Failed to upload files.")
  //   // server action add work
  //   const responseWork = await addWork({
  //     title,
  //     description,
  //     files: responseFiles.urlList
  //   })
  //   if (!responseWork.success) return toast.error("Failed to add Work.")
  //   toast.success("Upload complete.")
  //   resetForm()
  // }

  const resetForm = () => {
    onOpenChange(false)
    setPreviewMediaObj(undefined)
    window.scrollTo(0, 0)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        {/* <div>
          Data:
          {Object.keys(formDataTest).map(key => {
            if (key in formDataTest) {
              return (
                <div key={key}>
                  {key}: {formDataTest[key]}
                </div>
              )
            }
            return <div>No data</div>
          })}
        </div> */}
        <Label required>Title</Label>
        <Input
          {...register("title", {
            // required: "Title is required.",
            // minLength: { value: 2, message: "Title must be at least 2 characters long." },
            // pattern: {
            //   value: /^[a-zA-Z0-9\s]+$/,
            //   message: "Title must only contain letters, numbers, and spaces."
            // },
            // maxLength: { value: 30, message: "Title must be less than 80 characters long." }
          })}
          name="title"
          disabled={isSubmitting}
          error={errors && errors.title}
          onChange={e => setFormTitle(e.target.value)}
        />
      </div>
      <div>
        <Label required>Description</Label>
        <Textarea
          {...register("description", {
            // required: "Description is required.",
            // minLength: { value: 2, message: "Description must be at least 2 characters long." },
            // maxLength: { value: 90, message: "Description must be less than 90 characters long." }
          })}
          name="description"
          disabled={isSubmitting}
          error={errors && errors.description}
          onChange={e => setFormDescription(e.target.value)}
        />
      </div>

      <div className={cn({ hidden: work })}>
        <Label required>Photos/Videos</Label>
        {previewMediaObj ? previewFile(previewMediaObj, isSubmitting) : null}
        <Input
          {...register("files", {
            // required: "Photos/Videos are required.",
            // validate: files => {
            //   if (files.length >= 15) {
            //     return "Photos/Videos must be less than 15 files."
            //   }
            //   let message = ""
            //   const result = Array.from(files).every(file => {
            //     if (file.size > MAX_FILE_SIZE) {
            //       message = `One or more files are too large. (Max ${MAX_FILE_SIZE / 1000000}MB)`
            //       return false
            //     }
            //     if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            //       message = `Accepted file types are: ${ACCEPTED_FILE_TYPES_EXTENTION.join(", ")}.`
            //       return false
            //     }
            //     return true
            //   })
            //   if (!result) {
            //     return message
            //   }
            //   return true
            // }
          })}
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
const uploadFiles = async (files: FileList) => {
  console.log("files:::::", files)
  console.log("filesARRAY:::::", Array.from(files))
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
