import { Suspense } from "react"
import Gallery from "@/components/work/gallery"
import AddWorkInterface from "@/components/work/addWorkInterface"

export default function page() {
  return (
    <>
      <AddWorkInterface />
      <Suspense fallback={<div className="flex items-center justify-center opacity-70">Loading...</div>}>
        <Gallery />
      </Suspense>
    </>
  )
}
