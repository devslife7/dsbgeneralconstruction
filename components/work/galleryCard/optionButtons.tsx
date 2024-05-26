import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Modal } from "@/components/ui/modal"
import { WorkType } from "@/lib/validators/work"
import { GallerySVG, OptionsSVG, ReviewsSVG } from "@/public/svgs"
import DropdownMenuOptions from "./dropdownMenuOptions"
import MediaGalleryButton from "./mediaGalleryButton"
import Reviews from "./reviews"

export default function OptionButtons({ work }: { work: WorkType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mb-2 -mr-2 mt-0 flex justify-center px-4 py-2 text-xs">
        <OptionsSVG className="text-lg opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuOptions work={work} />
    </DropdownMenu>
  )
}
