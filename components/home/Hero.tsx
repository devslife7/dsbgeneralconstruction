import Link from "next/link"
import Image from "next/image"
import heroBackground from "@/public/images//hero-house.webp"
import { cn } from "@/lib/utils"
import { buttonStyles } from "../ui/button"

export default function Hero() {
  return (
    <div className="h-[30rem] lg:container lg:mx-auto lg:h-[54rem] lg:px-8">
      <div className="relative h-full w-full bg-black/30 lg:px-8">
        <Image
          alt="Hero Kitchen"
          src={heroBackground}
          fill
          sizes="100vw"
          priority
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 mx-auto flex h-full w-full items-center justify-center text-center text-white lg:w-auto lg:justify-start lg:text-left">
          <div className="max-w-[18rem] py-14 lg:ml-10 lg:max-w-2xl lg:py-20">
            <p className="font-roboto text-4xl font-semibold leading-tight md:text-5xl lg:text-7xl lg:leading-tight">
              Exceptional Home Remodeling & Renovations
            </p>
            <Link href="/work" className={cn(buttonStyles(), "mt-10 font-light lg:text-lg")}>
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
