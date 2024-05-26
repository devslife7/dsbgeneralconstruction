import { WorkType } from "@/lib/validators/work"
import StarFilledSVG from "@/public/svgs/starFilled.svg"
import OptionButtons from "./optionButtons"
import Link from "next/link"
import Image from "next/image"

export default function GalleryCard({ work }: { work: WorkType }) {
  const averageRating = work.rating && work.rating > 0 ? work.rating.toFixed(1) : work.rating
  const url = work.files && work.files.length > 0 ? work.files[0] : null

  return (
    <Link href={`/work/${work.id}`}>
      <div className="w-full rounded-lg bg-white pb-2 shadow-lg sm:max-w-md lg:max-w-xs">
        <Image
          src={work.files[0]}
          alt={work.title}
          width={100}
          height={200}
          quality={100}
          className="h-[400px] w-[400px] rounded-t-lg object-cover"
        />

        <div className="my-2 mt-2 px-4">
          <div className="flex items-end justify-between">
            <div className="mt-2 text-lg font-semibold opacity-80">{work.title}</div>
            <div className="flex items-center ">
              <StarFilledSVG className="text-primary" />
              <span className="ml-[0.2rem] mt-[0.1rem] text-center text-sm opacity-70">
                {averageRating}({work.Review.length})
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-sm opacity-60">{work.description}</div>
            <div>
              <OptionButtons work={work} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
