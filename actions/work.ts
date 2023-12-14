"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { deleteFilesFromS3, uploadFilesToS3 } from "./s3Upload"
import { WorkSchema } from "@/lib/validators/work"

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

export async function addWork(data: unknown) {
  // server-side validation
  const parsedData = WorkSchema.safeParse(data)
  if (!parsedData.success) {
    let errorMessage = ""
    parsedData.error.issues.forEach(issue => {
      errorMessage = errorMessage + "\n " + issue.message
    })
    return { status: 406, message: errorMessage }
  }

  try {
    // // // upload media to s3
    const mediaURLS: string[] | undefined = await uploadFilesToS3(parsedData.data.media)

    // // add work to db
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

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
