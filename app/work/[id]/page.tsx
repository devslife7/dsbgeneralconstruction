import { getWork } from "@/actions/work"
import ImageGallery from "@/components/work/image-gallery"
import Reviews from "@/components/work/reviews"
import BackButton from "@/components/work/ui/back-button"
import { BackArrowSVG } from "@/public/svgs"
import { redirect } from "next/navigation"

type WorkPageProps = {
  params: {
    id: number
  }
}

export default async function WorkPage({ params: { id } }: WorkPageProps) {
  const work = await getWork(+id)
  if (!work) return redirect("/")
  const { title, description, files, rating, Review, id: workId } = work

  return (
    <div className="my-container">
      <BackButton />
      <ImageGallery gallery={files} />
      <div className="my-4">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="text-lg text-gray-500">{description}</div>
        <div>Rating: {rating}</div>
      </div>
      <Reviews reviews={Review} workId={workId} />
    </div>
  )
}
