"use client"
import { removeWork } from "@/actions/work"
import { Modal } from "@/components/ui/modal"
import { DeleteSVG, EditSVG } from "@/public/svgs"
import { useState } from "react"
import { WorkType } from "@/lib/validators/work"
import WorkForm from "./forms/WorkForm"

export default function WorkOptions({ work }: { work: any }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex">
      {/* Edit Work */}
      <div className="p-1 text-2xl text-green-500" onClick={() => setOpen(true)}>
        <EditSVG />
      </div>
      {/* Delete Work */}
      <div
        onClick={() => confirm("Are you sure you want to delete this Work?") && removeWork(work)}
        className="p-1 text-2xl text-red-500"
      >
        <DeleteSVG />
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content title="Edit Work">
          <WorkForm work={work} onOpenChange={setOpen} />
        </Modal.Content>
      </Modal>
    </div>
  )
}
