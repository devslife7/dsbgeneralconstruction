import { GallerySVG, ReviewsSVG, OptionsSVG } from "@/public/svgs"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MediaGalleryButton from "./mediaGalleryButton"
import Reviews from "./reviews"
import DropdownMenuOptions from "./dropdownMenuOptions"
import { WorkType } from "@/lib/validators/work"
import { Modal } from "@/components/ui/modal"

export default function OptionButtons({ work }: { work: WorkType }) {
  return (
    <div className="flex items-center border-t border-black/30">
      <Modal>
        <Modal.Trigger className="flex w-1/2 items-center justify-center gap-2 border-r border-black/30 py-2 text-center text-xs">
          <ReviewsSVG className="mt-[.1rem] text-sm text-primary" />
          <div className="opacity-70">reviews({work.Review.length})</div>
        </Modal.Trigger>
        <Reviews work={work} />
      </Modal>

      <div className="relative h-8 w-1/2 cursor-pointer overflow-hidden">
        <MediaGalleryButton mediaURLS={work.media} className="relative z-10 opacity-0" />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  gap-1 text-center text-xs">
          <GallerySVG className="text-base text-primary" />
          <div className="opacity-70">gallery({work.media.length})</div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-1/6 justify-center border-l border-black/40 py-2 text-xs">
          <OptionsSVG className="w-auto text-base opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuOptions work={work} />
      </DropdownMenu>
    </div>
  )
}
