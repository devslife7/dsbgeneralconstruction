import { Suspense } from "react"
import Gallery from "@/components/work/gallery"
import CreateWorkForm from "@/components/work/createWorkForm"

export default function page() {
  return (
    <>
      <CreateWorkForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    </>
  )
}
