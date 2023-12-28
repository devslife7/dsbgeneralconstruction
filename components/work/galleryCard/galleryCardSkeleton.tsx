import StarFilledSVG from "@/public/svgs/starFilled.svg"
import { GallerySVG, ReviewsSVG } from "@/public/svgs"

export default function GalleryCardSkeleton() {
  return (
    <div className=" h-full w-full bg-white shadow-lg sm:max-w-md lg:max-w-xs">
      <div className="h-[20rem] w-full animate-pulse bg-slate-200 md:h-56"></div>

      <div className="mb-5 px-4">
        <div className="flex justify-between">
          <div className="mt-2 h-4 w-32 animate-pulse rounded-lg bg-slate-200"></div>
          <div className="flex animate-none items-center ">
            <span className="mr-[0.1rem] mt-[0.1rem] text-center text-sm opacity-70">0</span>
            <StarFilledSVG className="text-primary" />
          </div>
        </div>
        <div className="mt-3 h-4 w-52 animate-pulse rounded-lg bg-slate-200"></div>
      </div>
      <div className="flex items-center border-t border-black/30">
        <div className="flex w-1/2 items-center justify-center gap-2 border-r border-black/30 py-2 text-center text-xs">
          <ReviewsSVG className="mt-[.1rem] text-sm text-primary" />
          <div className=" h-4 w-20 animate-pulse rounded-lg bg-slate-200"></div>
        </div>

        <div className="relative h-8 w-1/2 cursor-pointer overflow-hidden">
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  gap-1 text-center text-xs">
            <GallerySVG className="text-base text-primary" />
            <div className=" h-4 w-20 animate-pulse rounded-lg bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
