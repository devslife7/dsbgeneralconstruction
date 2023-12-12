"use client";
import { useState } from "react";
import { Modal } from "../ui/modal";
import CreateWorkForm from "./forms/createWorkForm";
import Button from "../ui/button";

export default function AddWorkInterface() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <Button>Open Modal</Button>
      </Modal.Button>
      <Modal.Content title="Add Work">
        <CreateWorkForm />
      </Modal.Content>
    </Modal>
  );
}
