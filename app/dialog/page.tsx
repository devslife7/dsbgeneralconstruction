"use client";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function TestingModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root>
      <Dialog.Trigger>trigger</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl">Title</Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              X
            </Dialog.Close>
          </div>
          asdfasdf
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// <Modal open={open} onOpenChange={setOpen}>
//   <Modal.Button>button trigger here</Modal.Button>

//   <Modal.Content title="Edit Contact">
//     <TestForm />
//   </Modal.Content>
// </Modal>
function TestForm() {
  return (
    <form className="flex flex-col gap-4 bg-blue-300">
      <input type="text" placeholder="name" />
      <input type="text" placeholder="email" />
      <input type="text" placeholder="phone" />
      <button type="submit">Submit</button>
      <Modal.Close>Cancel</Modal.Close>
    </form>
  );
}
