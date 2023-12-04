import GalleryCard from "./galleryCard/galleryCard"
import { getWorkList } from "@/actions/work"

export default async function Gallery() {
  const gallery = await getWorkList()
  return (
    <div className="mt-10 mx-auto lg:container lg:px-8">
      <div className="my-container">
        <h1 className="text-center text-4xl font-bold opacity-70 mb-1">Our Work</h1>
        <p className=" text-center w-full m-auto opacity-60 mb-10">
          You’re invited to browse a selection of recently completed projects below.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-20 lg:gap-10 lg:justify-start">
        {gallery.map((work: any, index: number) => (
          <GalleryCard key={index} work={work} />
        ))}
      </div>
    </div>
  )
}
