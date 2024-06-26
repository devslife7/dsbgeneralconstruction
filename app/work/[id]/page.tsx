import { getWork } from "@/actions/work"
import BackButton from "@/components/ui/back-button"
import Rating from "@/components/ui/rating"
import ImageGallery from "@/components/work/image-gallery"
import ReviewList from "@/components/work/review-list"
import WorkOptions from "@/components/work/work-options"
import { redirect } from "next/navigation"

type WorkPageProps = {
  params: {
    id: number
  }
}

export default async function WorkPage({ params: { id } }: WorkPageProps) {
  const work = await getWork(+id)
  if (!work) return redirect("/")
  const { title, description, files, ratingAvg, ratingCount, Reviews, id: workId } = work

  return (
    <div className="my-container justify-center lg:flex">
      {/* Image gallery plus back button */}
      <div className="mx-auto max-w-2xl flex-initial basis-3/4">
        <BackButton />
        <ImageGallery urlList={files} />
      </div>
      <div className="mx-auto flex-initial basis-2/4 sm:max-w-sm">
        {/* Work Description section */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">{title}</div>
            <WorkOptions work={work} />
          </div>
          <div className="mt-1 text-gray-500">{description}</div>
          <div className="mt-2 flex items-center">
            <Rating
              size={20}
              readOnly
              ratingCount={ratingCount}
              ratingAvg={ratingAvg ? +ratingAvg.toFixed(1) : 0}
              className="text-base"
            />
          </div>
        </div>
        {/* Reviews section */}
        <ReviewList reviews={Reviews} workId={workId} />
      </div>
    </div>
  )
}
