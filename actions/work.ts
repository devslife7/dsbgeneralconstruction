"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { deleteFilesFromS3, uploadFilesToS3 } from "./s3Upload"
import { EditWorkSchema, WorkSchema, WorkType } from "@/lib/validators/work"

export async function getWorkList() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return await prisma.work.findMany({
    orderBy: {
      id: "desc"
    },
    include: {
      Review: true
    }
  })
}
export async function removeWork(work: any) {
  await deleteFilesFromS3(work)
  await prisma.work.delete({
    where: {
      id: work.id
    }
  })

  revalidatePath("/work")
}

export async function addWork(formData: FormData) {
  // throw new Error("Not implemented testing")

  const newWork = {
    title: formData.get("title"),
    description: formData.get("description"),
    media: formData.getAll("media")
  }
  // server-side validation
  const parsedData = WorkSchema.safeParse(newWork)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }

  try {
    // upload media to s3
    const mediaURLS: string[] | undefined = await uploadFilesToS3(parsedData.data.media)

    // add work to db
    await prisma.work.create({
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        media: mediaURLS
      }
    })

    revalidatePath("/work")
    return { status: 200, message: "Successfully added Work" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Work" }
  }
}

export async function updateWork(formData: FormData, work: WorkType) {
  const updatedWork = {
    id: work.id,
    title: formData.get("title"),
    description: formData.get("description")
  }
  // server-side validation
  const parsedData = EditWorkSchema.safeParse(updatedWork)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }

  try {
    // update work in db
    await prisma.work.update({
      where: {
        id: work.id
      },
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description
      }
    })

    revalidatePath("/work")
    return { status: 200, message: "Successfully updated Work" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to update Work" }
  }
}

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
