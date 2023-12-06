"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { deleteFilesFromS3, uploadFilesToS3 } from "./s3Upload"
import z from "zod"
// import { redirect } from "next/navigation"

const WorkSchema = z.object({
  title: z.string().trim().min(1, "Title field is required"),
  description: z.string().min(1, "Description field is required"),
  media: z
    .string({
      required_error: "Media field are required.",
    })
    .array(),
})

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

export async function addWork(prevState: any, formData: FormData) {
  // validate form data
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const media = formData.getAll("media") as File[]

  try {
    // upload media to s3
    const mediaURLS: string[] | undefined = await uploadFilesToS3(media)

    const response = WorkSchema.safeParse({ title, description, media: mediaURLS })
    if (!response.success) {
      let errorMessage = ""

      console.log(response.error)

      response.error.issues.forEach(issue => {
        errorMessage = errorMessage + "\n" + issue.message + "."
      })
      return { status: 406, message: errorMessage }
    }

    await prisma.work.create({
      data: {
        title,
        description,
        media: mediaURLS,
      },
    })

    revalidatePath("/work")
    // redirect("/work")
    return { status: 200, message: "Successfully added Work" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Work" }
  }
}

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
