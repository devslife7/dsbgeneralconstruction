import KitchenBg from "@/public/images/kitchen-bg.webp"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

export default function AboutSection() {
  return (
    <div className="my-container my-12 grid text-center lg:grid-cols-2 lg:text-left">
      <div className="m-auto w-full max-w-lg space-y-8 lg:order-1 lg:space-y-10 lg:max-xl:ml-6">
        <div className="text-3xl font-medium lg:text-5xl lg:font-normal">
          The Leading Bay Area Remodeling Company
        </div>
        <p className="text-lg font-light opacity-70">
          Our home renovation business is making waves in the Bay Area with our unique blend of creativity and
          craftsmanship. From kitchen makeovers that leave taste buds tingling to bathroom remodels that feel
          like a spa day at home.
        </p>
        <Link href="/about" className={cn(buttonVariants(), "mt-10 font-light lg:text-lg")}>
          More About Us
        </Link>
      </div>
      <Image src={KitchenBg} height={900} alt="kitchen" className="mx-auto mt-10 lg:mx-0 lg:mt-0" />
    </div>
  )
}
