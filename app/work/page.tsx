import { Suspense } from "react"
import Gallery from "@/components/work/gallery"
import AddWorkInterface from "@/components/work/addWorkInterface"
import LoadingGallery from "@/components/work/loading/loadingGallery"

export default function page() {
  return (
    <>
      <AddWorkInterface />
      <Suspense fallback={<LoadingGallery />}>
        <Gallery />
      </Suspense>
    </>
  )
}
