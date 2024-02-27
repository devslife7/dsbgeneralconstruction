"use server"
import { EditWorkSchemaServer, WorkSchema } from "@/lib/validators/work"
import { revalidatePath } from "next/cache"
import { prisma } from "../lib/db"
import { deleteFilesFromS3 } from "./s3Upload"

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
  const parsedData = WorkSchema.safeParse(workData)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }
  console.log("parsedData: ", parsedData)

  // add work to db
  try {
    await prisma.work.create({ data: parsedData.data })
    revalidatePath("/work")
    return { status: 200, message: "Successfully added Work", success: true }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Work" }
  }
}

export async function updateWork(data: unknown) {
  // server-side validation
  console.log("data: ", data)
  const parsedData = EditWorkSchemaServer.safeParse(data)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    console.log("parsedData: ", parsedData)
    return { status: 406, message: errorMessage }
  }

  console.log("------parsedData: ", parsedData)

  try {
    // update work in db
    await prisma.work.update({
      where: {
        id: parsedData.data.id
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
