"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { deleteFilesFromS3 } from "./s3Upload"
import { EditWorkSchema, WorkSchema, WorkType, WorkSchemaServerValidation } from "@/lib/validators/work"

export async function getWorkList() {
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

export async function addWork(workData: unknown) {
  // server-side validation
  const parsedData = WorkSchemaServerValidation.safeParse(workData)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }

  // add work to db
  try {
    await prisma.work.create({ data: parsedData.data })
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
