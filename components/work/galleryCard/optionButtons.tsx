import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { WorkType } from "@/lib/validators/work"
import { OptionsSVG } from "@/public/svgs"
import DropdownMenuOptions from "./dropdownMenuOptions"

export default function OptionButtons({ work }: { work: WorkType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-30 -mb-2 -mr-2 mt-0 flex justify-center px-4 py-2 text-xs">
        <OptionsSVG className="text-lg opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuOptions work={work} />
    </DropdownMenu>
  )
}
