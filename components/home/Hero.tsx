import Link from "next/link"
import Image from "next/image"
import heroBackground from "@/public/images//hero-house.webp"
import { buttonStyles } from "../ui/button"
import { cn } from "@/lib/utils"

export default function Hero() {
  return (
    <div
      className=" h-[30rem] lg:mx-auto lg:container lg:h-[54rem] lg:px-8
        "
    >
      <div className="relative w-full h-full lg:px-8 bg-black/30">
        <Image
          alt="Hero Kitchen"
          src={heroBackground}
          fill
          sizes="100vw"
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 flex items-center justify-center w-full h-full mx-auto text-center text-white lg:w-auto lg:text-left lg:justify-start">
          <div className="max-w-[18rem] lg:max-w-2xl py-14 lg:py-20 lg:ml-10">
            <p className="text-4xl font-semibold leading-tight font-roboto md:text-5xl lg:leading-tight lg:text-7xl">
              Exceptional Home Remodeling & Renovations
            </p>
            <Link href="/work" className={cn(buttonStyles({ size: "lg" }), "font-light lg:text-lg mt-10")}>
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
