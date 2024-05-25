"use client"
import { BackArrowSVG } from "@/public/svgs"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <div
      className="inline-flex cursor-pointer items-center gap-1 py-2 pr-4 font-semibold"
      onClick={router.back}
    >
      <BackArrowSVG className="text-2xl" />
      <u>Back</u>
    </div>
  )
}
