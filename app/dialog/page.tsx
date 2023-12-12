"use client";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button";

export default function TestingModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <Button variant="primary">dd Work</Button>
      </Modal.Button>
      <Modal.Content title="Share link">
        <TestForm />
      </Modal.Content>
    </Modal>
  );
}

function TestForm() {
  return (
    <form className="flex flex-col">
      <Label>Name</Label>
      <Input className="mb-5" type="text" placeholder="Enter your Name." />
      <Label>Email</Label>
      <Input className="mb-5" type="text" placeholder="Enter a valid Email." />
      <Label>Phone</Label>
      <Input
        className="mb-5"
        type="text"
        placeholder="Enter your phone number."
      />
      <Modal.Footer>
        <Modal.Close className="mr-5 opacity-70">Cancel</Modal.Close>
        <Button type="submit">Submit</Button>
      </Modal.Footer>
    </form>
  );
}
