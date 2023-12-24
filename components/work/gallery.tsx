import GalleryCard from "./galleryCard/galleryCard"
import { getWorkList } from "@/actions/work"

export default async function Gallery() {
  const gallery = await getWorkList()
  return (
    <div className="mx-auto mb-10 mt-5 lg:container lg:mt-10 lg:px-8">
      <div className="my-container">
        <h1 className="mb-10 hidden text-center text-4xl font-bold opacity-70 lg:mb-1 lg:block">Our Work</h1>
        <p className="m-auto mb-10 hidden w-full text-center opacity-60 lg:block">
          You&#39;re invited to browse a selection of recently completed projects below.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-20 lg:justify-center lg:gap-4">
        {gallery.map((work: any, index: number) => (
          <GalleryCard key={index} work={work} />
        ))}
      </div>
    </div>
  )
}
