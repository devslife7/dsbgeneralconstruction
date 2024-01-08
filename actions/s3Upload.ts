"use server"
// import { auth } from "@/auth"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import { MAX_FILE_SIZE } from "@/lib/constants"

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!
  }
})

const acceptedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/webm"
]

// Takes in a list of files and uploads them to S3
export async function uploadFilesToS3(fileList: File[]) {
  let urlArray: string[] | undefined = []
  try {
    // Upload file to S3
    if (fileList.length > 0 && fileList[0]) {
      for (const file of fileList) {
        const checksum = await computeSHA256(file)
        const signedURLResult = await getSignedURL(file.type, file.size, checksum)
        if (signedURLResult.error !== undefined) {
          console.error(signedURLResult.error)
          return
        }
        const url = signedURLResult.success.url
        urlArray.push(url.split("?")[0])
        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type
          }
        })
      }
    }
  } catch (e) {
    console.error(e)
    return
  }
  return urlArray
}

// Returns a signed URL for the file to be uploaded to
export async function getSignedURL(type: string, size: number, checksum: string) {
  // make sure user is authenticated
  // const session = await auth()
  const session = true

  if (!session) return { error: "Not authenticated" }
  if (!acceptedTypes.includes(type)) return { error: "File type not accepted" }
  if (size > MAX_FILE_SIZE) return { error: "File size too large" }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName() + `${type.split("/")[1]}`,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum
  })

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60
  })

  return { success: { url: signedURL } }
}

export async function deleteFilesFromS3(work: any) {
  for (const file of work.media) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file.split("/").pop()!
    })
    await s3.send(deleteObjectCommand)
  }
}

// Takes an input and produces a fixed-size string of bytes. Output is unique to the input.
const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
