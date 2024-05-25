"use client"
import { BackArrowSVG } from "@/public/svgs"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <div className="flex cursor-pointer items-center gap-2 font-semibold" onClick={router.back}>
      <BackArrowSVG />
      <u>Back</u>
    </div>
  )
}
