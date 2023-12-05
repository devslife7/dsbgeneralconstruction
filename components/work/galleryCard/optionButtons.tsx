import { GallerySVG, ReviewsSVG, OptionsSVG } from "@/public/svgs"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import MediaGalleryButton from "./mediaGalleryButton"
import Reviews from "./reviews"
import DropdownMenuOptions from "./dropdownMenuOptions"
import { deleteReview } from "@/actions/review"
import { createReview } from "@/actions/review"
import { Work } from "@/types"

export default function OptionButtons({ work }: { work: Work }) {
  return (
    <div className="flex items-center border-t border-black/30">
      <Dialog>
        <DialogTrigger className="flex items-center justify-center w-1/2 gap-2 py-2 text-xs text-center border-r border-black/30">
          <ReviewsSVG className="text-sm mt-[.1rem] text-primary" />
          <div className="opacity-70">reviews</div>
        </DialogTrigger>
        <Reviews work={work} deleteReview={deleteReview} createReview={createReview} />
      </Dialog>
      <div className="w-1/2 h-8 relative overflow-hidden cursor-pointer">
        <MediaGalleryButton mediaURLS={work.media} className="z-10 opacity-0 relative" />
        <div className="absolute top-0 left-0 flex items-center justify-center text-xs gap-1  w-full h-full text-center">
          <GallerySVG className="text-base text-primary" />
          <div className="opacity-70">gallery</div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center w-1/6 py-2 text-xs border-l border-black/40">
          <OptionsSVG className="w-auto text-base opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuOptions work={work} />
      </DropdownMenu>
    </div>
  )
}
