import { Suspense } from "react"
import Gallery from "@/components/work/gallery"
import CreatePostForm from "@/components/work/CreateWorkForm"

export default function page() {
  return (
    <>
      <CreatePostForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    </>
  )
}
