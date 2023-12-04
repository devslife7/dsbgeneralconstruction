"use server"
import { prisma } from "../lib/db"
import { revalidatePath } from "next/cache"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { uploadFilesToS3 } from "./s3Upload"

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

export async function addWork(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const media = formData.getAll("media") as File[]

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
}

export async function revalidateWorkPage() {
  revalidatePath("/work")
}
