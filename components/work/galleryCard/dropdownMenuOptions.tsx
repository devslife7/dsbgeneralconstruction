"use client"

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { removeWork } from "@/actions/work"
import { DeleteSVG, EditSVG } from "@/public/svgs"
import { WorkType } from "@/lib/validators/work"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"
import Button from "@/components/ui/button"
import WorkForm from "../forms/WorkForm"

export default function DropdownMenuOptions({ work }: { work: WorkType }) {
  const [test, setTest] = useState(false)
  const openModal = () => setTest(true)
  return (
    <div>
      <DropdownMenuContent className="text-gray-600">
        <DropdownMenuItem onClick={openModal}>
          <EditSVG className="mr-4 text-base text-green-500" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => removeWork(work)}>
          <DeleteSVG className="mr-4 text-red-500" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Modal open={test} onOpenChange={setTest}>
        <Modal.Content title="Edit Work">
          <WorkForm work={work} />
        </Modal.Content>
      </Modal>
    </div>
  )
}
