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
            <h2 className="block mt-32 mb-12 text-3xl font-semibold text-center text-gray-800 lg:mb-12 lg:mt-24 lg:text-5xl">
                Our Services Include
            </h2>
            <div className="grid lg:grid-cols-3 xl:container xl:mx-auto xl:px-8 lg:gap-6">
                <div className="relative w-full h-[22rem] lg:h-[45rem]">
                    <Image src={kitchen} alt="kitchen" fill className="hidden object-cover lg:block" />
                    <Image src={kitchenMobile} alt="kitchen" fill className="object-cover lg:hidden" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-center text-white bg-black/25">
                        Kitchens
                    </div>
                </div>
                <div className="relative w-full h-[22rem] lg:h-[45rem]">
                    <Image src={bathroom} alt="kitchen" fill className="hidden object-cover lg:block" />
                    <Image src={bathroomMobile} alt="kitchen" fill className="object-cover lg:hidden" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-center text-white bg-black/25">
                        Bathrooms
                    </div>
                </div>
                <div className="relative w-full h-[22rem] lg:h-[45rem]">
                    <Image src={interior} alt="kitchen" fill className="hidden object-cover lg:block" />
                    <Image src={interiorMobile} alt="kitchen" fill className="object-cover lg:hidden" />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-center text-white bg-black/25">
                        Interiors
                    </div>
                </div>
            </div>

            <div className="my-container text-center">
            <Link href="/services" className={cn(buttonStyles(), "font-light lg:text-lg mt-10")}>
                See All Services
            </Link>

            </div>
        </div>
    )
}
