"use client"
import CreateWorkForm from "./createWorkForm"
import { PlusSVG } from "@/public/svgs"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AddWorkButton({ createWork }: { createWork: (data: any) => void }) {
  const [openDialog, setOpenDialog] = useState(false)

  const closeDialog = () => setOpenDialog(false)

  return (
    <div className=" my-container">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger
          onClick={() => setOpenDialog(true)}
          className="p-4 bg-gray-300 rounded-full text-white hover:bg-gray-400"
        >
          <PlusSVG />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl font-medium">Add Work</DialogTitle>
            <DialogDescription>
              <CreateWorkForm createWork={createWork} closeDialog={closeDialog} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
