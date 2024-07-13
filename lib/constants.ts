export const MAX_FILE_SIZE = 10_000_000 // 10MB
// export const MAX_FILE_SIZE = 100_000 // 1MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/quicktime",
  "video/webm"
]

export const ACCEPTED_FILE_TYPES_EXTENTION = ACCEPTED_FILE_TYPES.map(type => "." + type.split("/")[1])
