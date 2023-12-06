import AddWorkButton from "@/components/work/addWorkButton"
import { Suspense } from "react"
import Gallery from "@/components/work/gallery"
import CreatePostForm from "@/components/work/CreatePostForm"
import { revalidateWorkPage } from "@/actions/work"
import Button from "@/components/ui/button"

export default function page() {
  const revalidate = async () => {
    await revalidateWorkPage()
  }
  return (
    <>
      <CreatePostForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
      {/* <AddWorkButton/> */}
      {/* <Button onClick={revalidate}>Revalidate</Button> */}
    </>
  )
}
