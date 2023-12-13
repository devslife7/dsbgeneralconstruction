"use client"
import { useState } from "react"
import { Modal } from "../ui/modal"
import Button from "../ui/button"
import Temp from "./forms/Temp"
import CreateWorkForm from "./forms/createWorkForm"

export default function AddWorkInterface() {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild className="flex w-full">
        <Button>Add Work</Button>
      </Modal.Trigger>
      <Modal.Content title="Add Work">
        <CreateWorkForm onOpenChange={setOpen} />
      </Modal.Content>
    </Modal>
  )
}
