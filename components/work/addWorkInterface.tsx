"use client"
import { useState } from "react"
import { Modal } from "../ui/modal"
import Button from "../ui/button"
import WorkForm from "./forms/WorkForm"

export default function AddWorkInterface() {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild className="mx-auto flex">
        <Button responsive>Add Work</Button>
      </Modal.Trigger>
      <Modal.Content title="Add Work">
        <WorkForm onOpenChange={setOpen} />
      </Modal.Content>
    </Modal>
  )
}
