import { getWork } from "@/actions/work"
import ImageGallery from "@/components/work/image-gallery"
import BackButton from "@/components/work/ui/back-button"
import { BackArrowSVG } from "@/public/svgs"
import { redirect } from "next/navigation"

type WorkPageProps = {
  params: {
    id: number
  }
}

export default async function WorkPage({ params: { id } }: WorkPageProps) {
  // get work info from database using id
  const work = await getWork(+id)
  if (!work) return redirect("/")

  const { title, description, files, rating, Review } = work

  return (
    <div className="my-container">
      <BackButton />
      <ImageGallery />
      <div>{title}</div>
      <div>{description}</div>
      <div>Rating: {rating}</div>
      {/* <div>Review: {Review}</div> */}
    </div>
  )
}
