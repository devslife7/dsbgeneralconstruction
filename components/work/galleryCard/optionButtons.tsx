import { GallerySVG, ReviewsSVG, OptionsSVG } from "@/public/svgs"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import MediaGalleryButton from "./mediaGalleryButton"
import Reviews from "./reviews"
import DropdownMenuOptions from "./dropdownMenuOptions"
import { deleteReview } from "@/actions/review"
import { createReview } from "@/actions/review"
import { WorkType } from "@/lib/validators/work"
import { Modal } from "@/components/ui/modal"

export default function OptionButtons({ work }: { work: WorkType }) {
  return (
    <div className="flex items-center border-t border-black/30">
      <Modal>
        <Modal.Trigger className="flex w-1/2 items-center justify-center gap-2 border-r border-black/30 py-2 text-center text-xs">
          <ReviewsSVG className="mt-[.1rem] text-sm text-primary" />
          <div className="opacity-70">reviews</div>
        </Modal.Trigger>
        <Reviews work={work} deleteReview={deleteReview} createReview={createReview} />
      </Modal>
      {/* <Dialog>
        <DialogTrigger className="flex w-1/2 items-center justify-center gap-2 border-r border-black/30 py-2 text-center text-xs">
          <ReviewsSVG className="mt-[.1rem] text-sm text-primary" />
          <div className="opacity-70">reviews</div>
        </DialogTrigger>
        <Reviews work={work} deleteReview={deleteReview} createReview={createReview} />
      </Dialog> */}
      <div className="relative h-8 w-1/2 cursor-pointer overflow-hidden">
        <MediaGalleryButton mediaURLS={work.media} className="relative z-10 opacity-0" />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  gap-1 text-center text-xs">
          <GallerySVG className="text-base text-primary" />
          <div className="opacity-70">gallery</div>
        </div>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center w-1/6 py-2 text-xs border-l border-black/40">
          <OptionsSVG className="w-auto text-base opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuOptions work={work} />
      </DropdownMenu> */}
    </div>
  )
}
