"use client"

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { removeWork } from "@/actions/work"
import { DeleteSVG, EditSVG } from "@/public/svgs"
import { Work } from "@/types"

export default function DropdownMenuOptions({ work }: { work: Work }) {
  const handleWorkDelete = async () => {
    await removeWork(work)
  }
  return (
    <DropdownMenuContent className="text-gray-600">
      <DropdownMenuItem>
        <EditSVG className="mr-4 text-base text-green-500" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleWorkDelete}>
        <DeleteSVG className="mr-4 text-red-500" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
