"use client"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"

export default function TestingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <button className="bg-orange-400 py-4 px-6 text-white font-semibold text-xl">Open Modal</button>
      <form className="flex flex-col gap-4 p-16 bg-blue-300">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="phone" />
        <button type="submit">Submit</button>
      </form>
      <Modal />
    </div>
  )
}
