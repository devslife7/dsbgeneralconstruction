"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { deleteFilesFromS3, uploadFilesToS3 } from "./s3Upload"
import { WorkSchema } from "@/lib/validators/work"
import { WorkType } from "@/lib/validators/work"
import { WorkFormType } from "@/lib/validators/work"
import { Work } from "@prisma/client"

export async function getWorkList() {
  return await prisma.work.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      Review: true,
    },
  })
}
export async function removeWork(work: any) {
  await deleteFilesFromS3(work)
  await prisma.work.delete({
    where: {
      id: work.id,
    },
  })

  revalidatePath("/work")
}

export async function addWork(formData: FormData) {
  // const validateForm = (formData: FormData) => {
  //   const title = formData.get("title") as string
  //   const description = formData.get("description") as string
  //   const media = formData.getAll("media") as File[]

  //   const resp = WorkSchema.safeParse({ title, description, media })
  //   let errors: WorkErrors = {}
  //   if (!resp.success) {
  //     resp.error.issues.forEach(issue => {
  //       errors = { ...errors, [issue.path[0]]: issue.message }
  //     })
  //   }
  //   if (media[0].size === 0) errors.media = "Media requires to have at least one image/video"

  //   const isErrsEmpty = Object.keys(errors).length === 0
  //   return isErrsEmpty
  //     ? { success: true, errors: {}, data: formData }
  //     : { success: false, errors: { ...errors }, data: formData }
  // }

  // server-side validation
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const media = formData.getAll("media") as File[]

  const parsedData = WorkSchema.safeParse({ title, description, media })
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n" + issue.message
    })
    return { status: 406, message: errorMessage }
  }

  try {
    // // upload media to s3
    // const mediaURLS: string[] | undefined = await uploadFilesToS3(media)

    // // add work to db
    // await prisma.work.create({
    //   data: {
    //     title,
    //     description,
    //     media: mediaURLS,
    //   },
    // })

    revalidatePath("/work")
    return { status: 200, message: "Successfully added Work" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Work" }
  }
}

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
