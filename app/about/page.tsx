import Image from "next/image"
import AboutPage from "@/public/images/about-page.webp"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonStyles } from "@/components/ui/button"

export default function About() {
  return (
    <div className="pt-4 lg:py-20">
      <div className="my-container text-center mb-8 lg:mb-20">
        <h1 className="text-2xl text-center font-semibold opacity-80 mb-4 lg:text-4xl">
          About DSB <br className="lg:hidden" /> General Construction
        </h1>
        <p className="opacity-60 text-center font-light max-w-3xl mx-auto lg:text-lg lg:leading-relaxed">
          At DSB General Construction, we focus on quality and attention to detail. Whether it&#39;s a kitchen
          remodel, bathroom renovation, or a complete home makeover, we approach each project with dedication
          and commitment to creating spaces that our clients love to call home. We take pride in delivering
          exceptional results
        </p>
      </div>
      <div className="h-[20rem] lg:h-[40rem] relative">
        <Image src={AboutPage} fill alt="About Us" className="object-cover fixed" />
      </div>
      <div className="text-center lg:mt-20 bg-black text-white py-20">
        <h2 className="font-semibold text-2xl">
          Create your dream home. <br /> Tell us about your project <br /> today.
        </h2>

        <div className="my-container text-center">
          <Link href="/contact" className={cn(buttonStyles(), "font-light lg:text-lg mt-10")}>
            Get A Free Estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
