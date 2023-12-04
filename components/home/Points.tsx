import { ClockSVG, HomeSVG, PeopleSVG } from "@/public/svgs"

export default function Points() {
  return (
    <>
      <div className="py-0 my-container lg:py-4">
        <div className="flex flex-wrap justify-center gap-8 my-20 md:gap-0 lg:justify-evenly">
          <div className="max-w-sm p-2 text-center">
            <HomeSVG className="mx-auto mb-1 text-4xl md:text-5xl text-primary" />
            <h1 className="mb-2 text-xl font-medium md:text-2xl">Expertise and Experience</h1>
            <p className="opacity-60 md:text-lg">
              Our craftsmanship ensures that the final outcome is not only visually appealing but also
              structurally sound and durable.
            </p>
          </div>
          <div className="max-w-sm p-2 text-center">
            {/* <PeopleSVG className="mx-auto mb-1 text-5xl md:text-5xl text-primary" /> */}
            <h1 className="mb-2 text-xl font-medium md:text-2xl">Portfolio and References</h1>
            <p className="opacity-60 md:text-lg">
              Our proven track record is a strong indicator of our reliability, craftsmanship, and ability to
              consistently deliver outstanding results.
            </p>
          </div>
          <div className="max-w-sm p-2 text-center">
            {/* <ClockSVG className="mx-auto mb-1 text-4xl md:text-5xl text-primary" /> */}
            <h1 className="mb-2 text-xl font-medium md:text-2xl">Commitment to Timelines</h1>
            <p className="opacity-60 md:text-lg">
              We prioritize punctuality and create a realistic project schedule with clear deadlines for each
              phase of the renovation.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
