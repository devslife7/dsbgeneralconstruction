"use client"
import { useRef, useState } from "react"
import { addWork } from "@/actions/work"
import Image from "next/image"
import Button, { buttonStyles } from "../ui/button"
import { useFormStatus } from "react-dom"
import { PreviewMedia } from "@/lib/types"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PlusSVG } from "@/public/svgs"
import { WorkSchema } from "@/lib/validators/work"

export default function CreatePostForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [previewMediaObj, setPreviewMediaObj] = useState<PreviewMedia[] | undefined>(undefined)
  const [openDialog, setOpenDialog] = useState(false)
  const [errors, setErrors] = useState<Object>({})

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
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const media = formData.getAll("media") as File[]

    const data = WorkSchema.safeParse({ title, description, media })

    console.log("data: ", data)
    console.log("media: ", media.entries())

    // const response = WorkSchema.safeParse({ title, description, media: mediaURLS })
    // if (!response.success) {
    //   let errorMessage = ""
    //   response.error.issues.forEach(issue => {
    //     errorMessage = errorMessage + "\n" + issue.message
    //   })
    //   return { status: 406, message: errorMessage }
    // }

    // const response = await addWork(formData)
    // if (response.status === 406) {
    //   toast.error("Validation Error", { description: response.message })
    //   return
    // }

    // if (response.status === 200) toast.success(response.message)
    // if (response.status === 500) toast.error(response.message)

    // // Reset Form
    // closerDialog()
    // setPreviewMediaObj(undefined)
    // window.scrollTo(0, 0)
    // ref.current?.reset()
  }

  return (
    <Dialog open={openDialog}>
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
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="title"
                placeholder="Title"
              />
              {/* <span className="text-red-400 text-sm">{errors.name?.message}</span> */}
            </div>
            <div>
              <label className="text-gray-700 text-sm font-bold mb-2">Description</label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="description"
                placeholder="Description"
              />
            </div>

            {previewMediaObj ? previewFile(previewMediaObj) : null}
            {fileInput(handleChange)}
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
      <Button aria-disabled={pending} type="submit">
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

// File input field
const fileInput = (handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
  return (
    <label className="my-4">
      {/* <svg
        className="w-7 h-7 hover:cursor-pointer transform-gpu active:scale-75 transition-all text-neutral-500"
        aria-label="Attach media"
        role="img"
        viewBox="0 0 20 20"
      >
        <title>Attach media</title>
        <path
          d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
          className="fill-current"
        ></path>
      </svg> */}
      {/* <AttachMediaSVG /> */}
      <input
        className="border-none outline-none text-sm"
        name="media"
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/mov"
        onChange={handleChange}
      />
    </label>
  )
}
