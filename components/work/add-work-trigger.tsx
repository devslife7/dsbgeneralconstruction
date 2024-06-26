"use client"
import { useState } from "react"
import { Modal } from "../ui/modal"
import Button from "../ui/my-button"
import WorkForm from "./forms/WorkForm"

export default function AddWorkTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild className="mx-auto flex">
        <Button responsive size="sm">
          Add Work
        </Button>
      </Modal.Trigger>
      <Modal.Content title="Add Work" className="max-h-full overflow-auto">
        <WorkForm onOpenChange={setOpen} />
      </Modal.Content>
    </Modal>
  )
}
