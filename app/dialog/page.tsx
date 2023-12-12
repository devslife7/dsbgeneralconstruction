"use client";
import { Modal } from "@/components/ui/modal";
import { useRef, useState } from "react";

export default function TestingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <button
        className="bg-orange-400 px-6 py-4 text-xl font-semibold text-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        Open Modal
      </button>
      <dialog
        ref={dialogRef}
        className="pointer-events-none inset-0 block w-1/3 translate-y-20 bg-green-200
        p-4 opacity-0 transition-[opacity,transform] duration-300
        backdrop:backdrop-blur-sm [&[open]]:pointer-events-auto [&[open]]:translate-y-0 [&[open]]:opacity-100"
      >
        <button
          type="button"
          className="absolute right-0 top-0 m-4"
          onClick={() => dialogRef.current?.close()}
        >
          X
        </button>
        <form className="flex flex-col gap-4 bg-blue-300">
          <input type="text" placeholder="name" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="phone" />
          <button type="submit">Submit</button>
        </form>
      </dialog>
    </div>
  );
}
