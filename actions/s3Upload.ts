"use server"
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!
  }
})

export async function deleteFilesFromS3(work: any) {
  const promises = work.files.map((url: string) => deleteFile(url))
  await Promise.all(promises)
}

async function deleteFile(url: string) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: url.split("/").pop()!
  })
  await s3.send(deleteObjectCommand)
}

export async function getPresignedURL(fileType: string) {
  const extension = fileType.split("/")[1]
  const Key = `${randomUUID()}.${extension}`

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key,
    ContentType: fileType
  })

  const uploadUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 })

  return { uploadUrl, Key }
}
