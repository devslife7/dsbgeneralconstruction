import GalleryCard from "./galleryCard"

export default function WorkList({ gallery }: { gallery: any }) {
  return (
    <div className="my-container">
      <div className="flex flex-wrap justify-center gap-6 lg:justify-center lg:gap-4">
        {gallery.map((work: any, idx: number) => (
          <GalleryCard key={idx} idx={idx} work={work} />
        ))}
      </div>
    </div>
  )
}
