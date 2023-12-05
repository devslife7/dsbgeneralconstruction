import OptionButtons from "./optionButtons"
import StarFilledSVG from "@/public/svgs/starFilled.svg"
import MediaGalleryButton from "./mediaGalleryButton"
import { Work } from "@/types"

export default function GalleryCard({ work }: { work: Work }) {
  return (
    <div className="w-full sm:max-w-md lg:max-w-xs h-full bg-white shadow-lg">
      <MediaGalleryButton mediaURLS={work.media} />

      <div className="px-4 mb-5">
        <div className="flex justify-between">
          <div className="mt-2 text-xl opacity-80">{work.title}</div>
          <div className="flex items-center ">
            <span className="mt-[0.1rem] mr-[0.1rem] text-sm text-center opacity-70">
              {work.rating > 0 ? work.rating.toFixed(1) : work.rating}
            </span>
            <StarFilledSVG className="text-primary" />
          </div>
        </div>
        <div className="opacity-60">{work.description}</div>
      </div>
      <OptionButtons work={work} />
    </div>
  )
}
