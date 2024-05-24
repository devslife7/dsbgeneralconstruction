"use client"
import { WorkType } from "@/lib/validators/work"
import StarFilledSVG from "@/public/svgs/starFilled.svg"
import MediaGalleryButton from "./mediaGalleryButton"
import OptionButtons from "./optionButtons"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function GalleryCard({ work }: { work: WorkType }) {
  const averageRating = work.rating && work.rating > 0 ? work.rating.toFixed(1) : work.rating
  return (
    <Link href={`/work/${work.id}`}>
      <div className="h-full w-full rounded-lg bg-white shadow-lg sm:max-w-md lg:max-w-xs">
        <MediaGalleryButton mediaURLS={work.files} />
        {/* <Link href={`/work/${work.id}`}>
        {work.title}
        Link here to work
        <ExternalLinkSVG className="ml-1 inline-block w-[10px] text-gray-400" />
      </Link> */}

        <div className="mb-5 px-4">
          <div className="flex justify-between">
            <div className="mt-2 text-xl opacity-80">{work.title}</div>
            <div className="flex items-center ">
              <StarFilledSVG className="text-primary" />
              <span className="ml-[0.2rem] mt-[0.1rem] text-center text-sm opacity-70">
                {averageRating}({work.Review.length})
              </span>
            </div>
          </div>
          <div className="opacity-60">{work.description}</div>
        </div>
        {/* <OptionButtons work={work} /> */}
      </div>
    </Link>
  )
}
