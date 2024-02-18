import OptionButtons from "./optionButtons"
import StarFilledSVG from "@/public/svgs/starFilled.svg"
import MediaGalleryButton from "./mediaGalleryButton"
import { WorkType } from "@/lib/validators/work"

export default function GalleryCard({ work }: { work: WorkType }) {
  const averageRating = work.rating && work.rating > 0 ? work.rating.toFixed(1) : work.rating
  return (
    <div className="h-full w-full bg-white shadow-lg sm:max-w-md lg:max-w-xs">
      <MediaGalleryButton mediaURLS={work.media} />

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
      <OptionButtons work={work} />
    </div>
  )
}
