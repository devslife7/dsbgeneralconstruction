import Image from "next/image"
import AboutPage from "@/public/images/about-page.webp"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonStyles } from "@/components/ui/button"

export default function About() {
  return (
    <div className="pt-5 lg:pt-20">
      <div className="my-container mb-8 text-center lg:mb-20">
        <h1 className="mb-4 text-center text-2xl font-semibold opacity-80 lg:text-4xl">
          About DSB <br className="lg:hidden" /> General Construction
        </h1>
        <p className="mx-auto max-w-3xl text-center font-light opacity-60 lg:text-lg lg:leading-relaxed">
          At DSB General Construction, we focus on quality and attention to detail. Whether it&#39;s a kitchen
          remodel, bathroom renovation, or a complete home makeover, we approach each project with dedication
          and commitment to creating spaces that our clients love to call home. We take pride in delivering
          exceptional results
        </p>
      </div>
      <div className="relative h-[20rem] lg:h-[40rem]">
        <Image src={AboutPage} fill alt="About Us" className="fixed object-cover" placeholder="blur" />
      </div>
      <div className="bg-black py-20 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Create your dream home. <br /> Tell us about your project <br /> today.
        </h2>

        <div className="my-container text-center">
          <Link href="/contact" className={cn(buttonStyles(), "mt-10 font-light lg:text-lg")}>
            Get A Free Estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
