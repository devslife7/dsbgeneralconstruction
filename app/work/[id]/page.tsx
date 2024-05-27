import { getWork } from "@/actions/work"
import Rating from "@/components/ui/rating"
import ImageGallery from "@/components/work/image-gallery"
import Reviews from "@/components/work/reviews"
import BackButton from "@/components/work/ui/back-button"
import { BackArrowSVG, StarFilledSVG } from "@/public/svgs"
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
    <div className="my-container justify-center lg:flex">
      <div className="max-w-2xl flex-initial basis-3/4">
        <BackButton />
        <ImageGallery gallery={files} />
      </div>
      <div className="flex-initial basis-2/4 sm:max-w-sm">
        <div className="mt-5">
          <div className="mb-1 text-xl font-semibold">{title}</div>
          <div className=" text-gray-500">{description}</div>
          <div className="mt-2 flex items-center">
            <Rating size={20} readOnly ratings={[0, 1, 2, 3, 4, 5]} className="text-base" />
          </div>
        </div>

        <Reviews reviews={Review} workId={workId} />
      </div>
    </div>
  )
}
