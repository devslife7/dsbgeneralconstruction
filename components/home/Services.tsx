import kitchen from "@/public/images/kitchen-service.webp"
import kitchenMobile from "@/public/images/kitchen-service-mobile.webp"
import bathroom from "@/public/images/bathroom-service.webp"
import bathroomMobile from "@/public/images/bathroom-service-mobile.webp"
import interior from "@/public/images/interior-service.webp"
import interiorMobile from "@/public/images/interior-service-mobile.webp"
import Image from "next/image"
import Link from "next/link"
import { buttonStyles } from "../ui/button"
import { cn } from "@/lib/utils"

export default function Services() {
  return (
    <div className="mb-10">
      <h2 className="mb-12 mt-32 block text-center text-3xl font-semibold text-gray-800 lg:mb-12 lg:mt-24 lg:text-5xl">
        Our Services Include
      </h2>
      <div className="grid xl:container lg:grid-cols-3 lg:gap-6 xl:mx-auto xl:px-8">
        <div className="relative h-[22rem] w-full lg:h-[45rem]">
          <Image src={kitchen} alt="kitchen" fill sizes="100vw" className="hidden object-cover lg:block" />
          <Image src={kitchenMobile} alt="kitchen" fill sizes="100vw" className="object-cover lg:hidden" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-center text-3xl font-medium text-white">
            Kitchens
          </div>
        </div>
        <div className="relative h-[22rem] w-full lg:h-[45rem]">
          <Image src={bathroom} alt="kitchen" fill sizes="100vw" className="hidden object-cover lg:block" />
          <Image src={bathroomMobile} alt="kitchen" fill sizes="100vw" className="object-cover lg:hidden" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-center text-3xl font-medium text-white">
            Bathrooms
          </div>
        </div>
        <div className="relative h-[22rem] w-full lg:h-[45rem]">
          <Image src={interior} alt="kitchen" fill sizes="100vw" className="hidden object-cover lg:block" />
          <Image
            src={interiorMobile}
            alt="kitchen mobile"
            fill
            sizes="100vw"
            className="object-cover lg:hidden"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-center text-3xl font-medium text-white">
            Interiors
          </div>
        </div>
      </div>

      <div className="my-container text-center">
        <Link href="/services" className={cn(buttonStyles(), "mt-10 font-light lg:text-lg")}>
          See All Services
        </Link>
      </div>
    </div>
  )
}
