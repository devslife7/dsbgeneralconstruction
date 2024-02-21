"use server"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!
  }
})

export async function uploadFilesToS3(file: File) {
  const ex = (file.type as string).split("/")[1]

  const Key = `${randomUUID()}.${ex}`

  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: `image/${ex}`
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key,
    ContentType: file.type
    // ContentLength: size,
    // ChecksumSHA256: checksum
  })

  const uploadUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 })

  console.log("uploadUrl", uploadUrl)

  return { uploadUrl, Key }
}
