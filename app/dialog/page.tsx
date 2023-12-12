"use client";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function TestingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <button className="bg-orange-400 px-6 py-4 text-xl font-semibold text-white">
        Open Modal
      </button>
      <form className="flex flex-col gap-4 bg-blue-300 p-16">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="phone" />
        <button type="submit">Submit</button>
      </form>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
