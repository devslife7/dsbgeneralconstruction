"use client"

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { removeWork } from "@/actions/work"
import { DeleteSVG, EditSVG } from "@/public/svgs"

type WorkProps = {
  id: number
  title: string
  description: string
  media: string[]
  rating: number
  Review: any[]
}

export default function DropdownMenuOptions({ work }: { work: WorkProps }) {
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
