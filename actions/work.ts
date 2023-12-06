"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { uploadFilesToS3 } from "./s3Upload"
// import { redirect } from "next/navigation"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!,
  },
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
  // delete from s3
  for (const file of work.media) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file.split("/").pop()!,
    })
    await s3.send(deleteObjectCommand)
  }

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
    return { status: 406, message: "validation error here" }
  } catch (e) {
    console.error(e)
    return { status: 500, message: "Failed to add Work" }
  }
}

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
