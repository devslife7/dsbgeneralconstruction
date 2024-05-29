import StarFilledSVG from "@/public/svgs/starFilled.svg"
import Link from "next/link"
import Image from "next/image"
import { WorkType } from "@/lib/validators/work"

export default function GalleryCard({ work }: { work: WorkType }) {
  if (!work.files || work.files.length === 0) return null
  const { title, description, files, id: workId, ratingCount, ratingAvg } = work
  const thumbnailURL = files[0]

  return (
    <Link href={`/work/${workId}`}>
      <div className="rounded-lg bg-white pb-2 shadow-lg sm:max-w-sm lg:max-w-xs">
        <div className="rounded-lg bg-background">
          {thumbnailURL && !!thumbnailURL.match(/mp4|mov|webm|quicktime/) ? (
            <video
              src={thumbnailURL}
              width={400}
              height={200}
              className="mx-auto h-[400px] w-[400px] rounded-t-lg"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <Image
              src={thumbnailURL}
              alt={title}
              width={400}
              height={400}
              className="h-[400px] w-[400px] rounded-t-lg object-cover"
            />
          )}
        </div>
        <div className="my-2 mt-2 px-4">
          <div className="flex items-end justify-between">
            <div className="mt-2 text-lg font-semibold opacity-80">{title}</div>
            <div className="flex items-center ">
              <StarFilledSVG className="text-primary" />
              <span className="ml-[0.2rem] mt-[0.1rem] text-center text-sm opacity-70">
                {ratingAvg.toFixed(1)}({ratingCount})
              </span>
            </div>
          </div>
          <div className="mt-1 text-base opacity-60">{description}</div>
        </div>
      </div>
    </Link>
  )
}
